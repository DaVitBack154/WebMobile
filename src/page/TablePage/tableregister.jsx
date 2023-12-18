import { Box } from '@chakra-ui/react';
import { Table, Switch } from 'antd';
import { useState, useEffect } from 'react';
import swal from 'sweetalert2';
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
    // {
    //   title: 'Type_Star',
    //   dataIndex: 'status_star',
    //   key: 'status_star',
    // },
    {
      title: 'ยอมรับข้อ 1',
      dataIndex: 'yomrub1',
      key: 'yomrub1',
    },
    {
      title: 'ยอมรับข้อ 2',
      dataIndex: 'yomrub2',
      key: 'yomrub2',
    },
    {
      title: 'ยอมรับข้อ 3',
      dataIndex: 'yomrub3',
      key: 'yomrub3',
    },
    {
      title: 'ส่งประเมิล',
      dataIndex: '',

      render: (_, record) => (
        <Switch
          checked={record.status_star === 'Y'}
          onChange={(e) => {
            console.log('record._id:', record._id);
            onChangeswitch(e, record._id);
          }}
        />
      ),
    },
    {
      title: 'ให้คะแนนดาว',
      dataIndex: 'starpoint',
      key: 'starpoint',
    },
    {
      title: 'ความคิดเห็น',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const onChangeswitch = async (e, id) => {
    const newStatusStar = e ? 'Y' : 'N';
    try {
      let popUpstart = await axios.put(
        import.meta.env.VITE_REACT_APP_API + '/updatestar/' + id,
        { status_star: newStatusStar }
      );
      if (popUpstart) {
        swal
          .fire({
            title: '',
            text: popUpstart.data.message,
            icon: 'success',
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.reload(true);
            }
          });
      } else {
        swal.fire({
          title: '',
          text: popUpstart.data.message,
          icon: 'error',
          confirmButtonText: 'X',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
