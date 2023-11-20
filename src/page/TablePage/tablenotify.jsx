import { Box, Flex, Button } from '@chakra-ui/react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SlDocs } from 'react-icons/sl';

export default function TableNotify() {
  const [tablenotify, setTablenotify] = useState([]);
  useEffect(() => {
    const inti = async () => {
      try {
        let tablePromotion = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getnotifyall'
        );
        // let tableNotiID = await axios.get(
        //   import.meta.env.VITE_REACT_APP_API + '/getnotify_id'
        // );
        // console.log(tableNotiID);
        if (tablePromotion?.status) {
          let data = tablePromotion.data.data;
          setTablenotify(data);
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
        <NavLink to={'/update-notify/' + record._id}>
          <Button>
            <SlDocs />
          </Button>
        </NavLink>
      ),
    },
    {
      title: 'Contract_no',
      dataIndex: 'contract_no',
      key: 'contract_no',
    },
    {
      title: 'ID-Card',
      dataIndex: 'id_cardno',
      key: 'id_cardno',
    },
    {
      title: 'Title_noti',
      dataIndex: 'title_noti',
      key: 'title_noti',
    },
    {
      title: 'Body_noti',
      dataIndex: 'body_noti',
      key: 'body_noti',
    },
    {
      title: 'Date_Sent',
      dataIndex: 'datetime_noti',
      key: 'datetime_noti',
    },
    {
      title: 'วันที่บันทึก',
      dataIndex: 'date_save',
      key: 'date_save',
    },
    {
      title: 'Status_read',
      dataIndex: 'status_read',
      key: 'status_read',
    },
    {
      title: 'Sent_Noti',
      dataIndex: 'status_noti',
      key: 'status_noti',
    },
    {
      title: 'Status_firebase',
      dataIndex: 'status_firebase',
      key: 'status_firebase',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table Notify</Box>
        <Box>
          <Flex>
            <Box>
              <NavLink to={'/from-notify'}>
                <Button>บันทึกข้อมูลแบบ File</Button>
              </NavLink>
            </Box>
            <Box ml={5}>
              <NavLink to={'/from-notione'}>
                <Button>บันทึกข้อมูลแบบบุคคล</Button>
              </NavLink>
            </Box>
          </Flex>

          <Table columns={columns} dataSource={tablenotify} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
