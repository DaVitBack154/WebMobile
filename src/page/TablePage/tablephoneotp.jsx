import { Box } from '@chakra-ui/react';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TablePhoneOTP() {
  const [tablephonedata, setTablephonedata] = useState([]);

  useEffect(() => {
    const inti = async () => {
      try {
        let tableUserdata = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getphome'
        );
        if (tableUserdata?.status) {
          let data = tableUserdata.data.data;
          setTablephonedata(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    inti();
  }, []);

  const columns = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'OTP',
      dataIndex: 'otp',
      key: 'otp',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date-Req',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table Phone</Box>
        <Box>
          <Table columns={columns} dataSource={tablephonedata} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
