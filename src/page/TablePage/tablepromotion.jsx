import { Box, Button } from '@chakra-ui/react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillFile } from 'react-icons/ai';
import { SlDocs } from 'react-icons/sl';

export default function TablePromotion() {
  const [tablepromotion, setTablepromotion] = useState([]);
  useEffect(() => {
    const inti = async () => {
      try {
        let tablePromotion = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/promotion'
        );
        if (tablePromotion?.status) {
          let data = tablePromotion.data.data;
          setTablepromotion(data);
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
        <NavLink to={'/update-promotion/' + record._id}>
          <Button>
            <SlDocs />
          </Button>
        </NavLink>
      ),
    },
    {
      title: 'วันหมดอายุ',
      dataIndex: 'expired_date',
      key: 'expired_date',
      width: 130,
      align: 'center',
      render: (expired_date) =>
        expired_date ? expired_date : <div>ไม่มีวันหมดอายุ</div>,
    },
    {
      title: 'หัวข้อ-ข้อความ',
      dataIndex: 'title_pro',
      key: 'title_pro',
    },
    // {
    //   title: 'เนื้อหา-ข้อความ',
    //   dataIndex: 'content_pro',
    //   key: 'content_pro',
    //   width: 500,
    // },
    {
      title: 'type',
      dataIndex: 'type_image',
      key: 'type_image',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      align: 'center',
      width: 100,
      render: (_, record) =>
        record.image && (
          <a
            href={
              import.meta.env.VITE_REACT_APP_API +
              '/public/image/' +
              record.image
            }
            target="__blank"
          >
            <AiFillFile
              style={{
                fontSize: '30px',
                color: '#90ADAD',
              }}
            />
          </a>
        ),
    },
    {
      title: 'nameEmp',
      dataIndex: 'name_emp',
      key: 'name_emp',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table Promotion</Box>
        <Box>
          <Box>
            <NavLink to={'/from-promotion'}>
              <Button>Add-Promotion</Button>
            </NavLink>
          </Box>
          <Table columns={columns} dataSource={tablepromotion} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
