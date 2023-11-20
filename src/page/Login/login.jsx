import { Form, Input } from 'antd';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import { setAccount } from '../../store/AccoutReducer';
import { useDispatch } from 'react-redux';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { FaUnlockAlt } from 'react-icons/fa';

let permissionUser = {
  recruit: ['N796'],
};

export default function Login() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useNavigate();

  const onFinish = async (values) => {
    let resp = await axios.post(
      import.meta.env.VITE_REACT_APP_API_USER + '/login',
      values
    );
    console.log(resp, 'aaaa');
    if (resp.data.status) {
      const token = resp.data.token;

      if (localStorage.getItem('token', token) == null) {
        await localStorage.setItem('token', token);
      }
      await localStorage.getItem('token', token);

      const header = `Authorization: Bearer ${token}`;
      let userdata = await axios.get(
        import.meta.env.VITE_REACT_APP_API_USER + '/getprofile',
        {
          withCredentials: true,
          headers: header,
        }
      );
      if (userdata?.data?.status) {
        let dataprofile = await userdata.data.data;
        // let checkPermission = Object.entries(permissionUser)
        //   .filter(([value]) => value.includes(dataprofile.UserID))
        //   .reduce((acc, [key]) => {
        //     acc = key;
        //     return acc;
        //   }, null);

        let checkPermission = Object.keys(permissionUser).find((key) =>
          permissionUser[key].includes(dataprofile.UserID)
        );
        console.log(checkPermission, 'olo');

        if (checkPermission) {
          // dataprofile['role'] = checkPermission;
          dataprofile = { ...dataprofile, role: checkPermission };
          dispatch(setAccount(dataprofile));
          history('/homepage');
        } else {
          swal.fire({
            title: '',
            text: 'คุณไม่มีสิทธิ์เข้าใช้งาน',
            icon: 'error',
            confirmButtonText: 'close',
          });
          history('/');
        }
      }
    } else {
      swal.fire({
        title: '',
        text: resp.data.message,
        icon: 'error',
        confirmButtonText: 'X',
      });
    }
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        w="100%"
        h={'100vh'}
        bg="#E9EDF9"
        flexDirection="column"
      >
        <Box
          w={'40%'}
          bg={'#FFFF'}
          justifyContent={'center'}
          display={'flex'}
          flexDirection={'column'}
          p={'10'}
          borderRadius={'10'}
        >
          <Flex justifyContent={'center'}>
            <img src="/chase.png" width={250} alt="" />
          </Flex>
          <br />
          <Box>
            <Form form={form} onFinish={onFinish} autoComplete="off">
              <Form.Item
                name={'EUserName'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username !',
                  },
                ]}
              >
                <Input
                  prefix={<BsFillPersonCheckFill className="icon-login" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name={'UserPassword'}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password !',
                  },
                ]}
              >
                <Input.Password
                  prefix={<FaUnlockAlt className="icon-login" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="submit"
                  w={'150px'}
                  bg={'rgb(1, 83, 82)'}
                  textColor={'#FFFF'}
                  fontWeight={'bold'}
                  fontSize={'16'}
                  mt={'5'}
                  _hover={'red'}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
