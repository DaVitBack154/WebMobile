import { Box, Button } from '@chakra-ui/react';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { SlDocs } from 'react-icons/sl';

export default function TablereqUser() {
  const [tablerequser, setTablerequser] = useState([]);
  useEffect(() => {
    const inti = async () => {
      try {
        let tableUserdata = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/get_requser'
        );
        if (tableUserdata?.status) {
          let data = tableUserdata.data;
          setTablerequser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    inti();
  }, []);
  const columns = [
    {
      title: '',
      dataIndex: '',
      width: 10,
      render: (_, record) => (
        <NavLink to={'/update-requser/' + record._id}>
          <Button>
            <SlDocs />
          </Button>
        </NavLink>
      ),
    },

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
      title: 'เลขที่สัญญา',
      dataIndex: 'no_contract',
      key: 'no_contract',
    },
    {
      title: 'เอกสารที่ขอ',
      dataIndex: 'list_req',
      key: 'list_req',
    },
    {
      title: 'เลขที่ใบเสร็จ',
      dataIndex: 'receive_no',
      key: 'receive_no',
    },
    // {
    //   title: 'ส่งรูปแบบ Email',
    //   dataIndex: 'sent_emailuser',
    //   key: 'sent_emailuser',
    // },
    // {
    //   title: 'ส่งรูปแบบ ที่อยู่',
    //   dataIndex: 'sent_addressuser',
    //   key: 'sent_addressuser',
    // },
    {
      title: 'status',
      dataIndex: 'status_req',
      key: 'status_req',
    },
    {
      title: 'nameEmp',
      dataIndex: 'name_emp',
      key: 'name_emp',
    },
    {
      title: 'Date_Sent',
      dataIndex: 'date_sent',
      key: 'date_sent',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table RequestUser Doc</Box>
        <Box>
          <Table columns={columns} dataSource={tablerequser} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
