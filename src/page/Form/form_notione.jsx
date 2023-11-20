import { Form, Input } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
const { TextArea } = Input;
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function Form_notione() {
  const [form] = Form.useForm();
  const history = useNavigate();

  const onFinish = async (values) => {
    let dateSave = new Date();
    values.datetime_noti = dateSave;

    let result = await axios.post(
      import.meta.env.VITE_REACT_APP_API + '/createnotify',
      values
    );

    if (result.data.status) {
      swal
        .fire({
          title: '',
          text: result.data.message,
          icon: 'success',
        })
        .then((result) => {
          if (result.isConfirmed) {
            history('/homepage');
          }
        });
    } else {
      swal.fire({
        title: '',
        text: result.data.message,
        icon: 'error',
        confirmButtonText: 'X',
      });
    }
  };
  return (
    <>
      <Box p={5}>
        <Flex
          bg={'#355958'}
          w={'230px'}
          p={3}
          justifyContent={'center'}
          textColor={'#FFFF'}
          fontWeight={'bold'}
          borderRadius={10}
        >
          Create NotifyPerson
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Box>เลขบัตรประชาชน</Box>
          <Form.Item
            name="id_cardno"
            rules={[
              {
                required: true,
                message: 'เลขบัตรประชาชน',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Box>เลขที่สัญญา</Box>
          <Form.Item
            name="contract_no"
            rules={[
              {
                required: true,
                message: 'ควรมีตัวอักษรมากกว่าหรือเท่ากับ 50 ตัว',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Box>หัวข้อ-ข้อความ</Box>
          <Form.Item
            name="title_noti"
            rules={[
              {
                required: true,
                message: 'ควรมีตัวอักษรมากกว่าหรือเท่ากับ 50 ตัว',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Box>เนื้อหาข้อความ</Box>
          <Form.Item
            name="body_noti"
            rules={[
              {
                required: true,
                message: 'ควรมีตัวอักษรมากกว่าหรือเท่ากับ 50 ตัว',
              },
            ]}
          >
            <TextArea rows={4} minLength={20} />
          </Form.Item>

          <Form.Item>
            <Box mt={3}>
              <Button type="submit" mr={3}>
                ➤ SAVE
              </Button>

              <Button
                type="submit"
                onClick={() => {
                  history('/homepage');
                }}
              >
                ➤ HOME
              </Button>
            </Box>
          </Form.Item>
        </Form>
      </Box>
    </>
  );
}
