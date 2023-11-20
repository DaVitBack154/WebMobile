import { Box } from '@chakra-ui/react';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function TableRegister() {
  const [tableuserdata, setTableuserdata] = useState([]);
  useEffect(() => {
    const inti = async () => {
      try {
        let tableUserdata = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getdatauserall'
        );
        if (tableUserdata?.status) {
          let data = tableUserdata.data;
          setTableuserdata(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    inti();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'ID-Card',
      dataIndex: 'id_card',
      key: 'id_card',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Type_Customer',
      dataIndex: 'type_customer',
      key: 'type_customer',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table Register</Box>
        <Box>
          <Table columns={columns} dataSource={tableuserdata} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
