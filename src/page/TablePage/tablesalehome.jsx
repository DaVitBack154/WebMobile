import { Box, Button } from '@chakra-ui/react';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillFile } from 'react-icons/ai';
import { SlDocs } from 'react-icons/sl';

export default function TableSaleHome() {
  const [tablepromotion, setTablepromotion] = useState([]);
  useEffect(() => {
    const inti = async () => {
      try {
        let tablePromotion = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getsalehome'
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
        <NavLink to={'/update-salehome/' + record._id}>
          <Button>
            <SlDocs />
          </Button>
        </NavLink>
      ),
    },
    {
      title: 'ชื่อบ้าน',
      dataIndex: 'name_home',
      key: 'name_home',
      align: 'center',
    },
    {
      title: 'ที่อยู่บ้าน',
      dataIndex: 'location_home',
      key: 'location_home',
    },
    {
      title: 'ราคาบ้าน',
      dataIndex: 'price_home',
      key: 'price_home',
    },
    {
      title: 'รายละเอียดบ้าน',
      dataIndex: 'detail_home',
      key: 'detail_home',
    },
    {
      title: 'Image_Show',
      dataIndex: 'img_show',
      align: 'center',
      width: 100,
      render: (_, record) =>
        record.img_show && (
          <a
            href={
              import.meta.env.VITE_REACT_APP_API +
              '/public/image/' +
              record.img_show
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
      title: 'Status',
      dataIndex: 'status_home',
      key: 'status_home',
      align: 'center',
    },
  ];

  return (
    <>
      <Box p={5}>
        <Box mb={4}>Table SaleHome</Box>
        <Box>
          <Box>
            <NavLink to={'/from-salehome'}>
              <Button>Add-SaleHome</Button>
            </NavLink>
          </Box>
          <Table columns={columns} dataSource={tablepromotion} rowKey="_id" />
        </Box>
      </Box>
    </>
  );
}
