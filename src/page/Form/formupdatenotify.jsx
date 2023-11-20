import { Form, Input, Select } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
const { TextArea } = Input;

export default function FromUpdateNotify() {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const init = async () => {
      try {
        let dataID = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getnotify/' + _id
        );
        if (dataID.data.status) {
          let data = dataID.data.data;
          form.setFieldsValue(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [form, _id]);

  const onFinish = async (values) => {
    let result = await axios.put(
      import.meta.env.VITE_REACT_APP_API + '/updatenotify/' + _id,
      values
    );

    if (result) {
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
          NotifyUser
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Flex w={'100%'}>
            <Box w={'50%'}>
              <Form.Item name={'id_card'} label="ID-Card">
                <Input readOnly />
              </Form.Item>
            </Box>
            <Box w={'50%'} ml={2}>
              <Form.Item name={'contract_no'} label="เลขที่สัญญา">
                <Input readOnly />
              </Form.Item>
            </Box>
          </Flex>

          <Box>
            <Form.Item name={'title_noti'} label="title_noti">
              <Input />
            </Form.Item>
          </Box>

          <Box>เนื้อหาข้อความ</Box>
          <Form.Item name={'body_noti'}>
            <TextArea rows={4} />
          </Form.Item>

          <Flex w={'100%'}>
            <Box w={'50%'}>
              <Form.Item
                name={'sent_type'}
                label="หัวข้อการส่ง"
                rules={[
                  {
                    required: true,
                    message: 'Please choise',
                  },
                ]}
              >
                <Select className="" placeholder="Please-Choise">
                  <Select.Option value={'ONE'}>ONE</Select.Option>
                  <Select.Option value={'ALL'}>ALL</Select.Option>
                </Select>
              </Form.Item>
            </Box>
            <Box w={'50%'} ml={2}>
              <Form.Item name={'name_emp'} label="ชื่อพนักงาน">
                <Input readOnly />
              </Form.Item>
            </Box>
          </Flex>

          <Form.Item
            name={'status_read'}
            label="อ่านยัง"
            rules={[
              {
                required: true,
                message: 'Please choise',
              },
            ]}
          >
            <Select className="" placeholder="Please-Choise">
              <Select.Option value={'N'}>N</Select.Option>
              <Select.Option value={'Y'}>Y</Select.Option>
            </Select>
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
