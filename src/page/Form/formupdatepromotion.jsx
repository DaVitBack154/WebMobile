import { Form, Input, Select } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
const { TextArea } = Input;

export default function FormUpdatePromotion() {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const init = async () => {
      try {
        let dataID = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/promotion/' + _id
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
      import.meta.env.VITE_REACT_APP_API + '/promotion/' + _id,
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
          UpdatePromotion
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Box>หัวข้อ-ข้อความ</Box>
          <Form.Item name={'title_pro'}>
            <Input />
          </Form.Item>

          <Box>เนื้อหาข้อความ</Box>
          <Form.Item name={'content_pro'}>
            <TextArea rows={5} />
          </Form.Item>

          <Box>หัวข้อโปรโมชั่น บน-ล่าง</Box>
          <Form.Item
            name={'type_image'}
            rules={[
              {
                required: true,
                message: 'Please choise',
              },
            ]}
          >
            <Select className="" placeholder="Please-Choise">
              <Select.Option value={'image_bon'}>Promotion-Top</Select.Option>
              <Select.Option value={'image_lang'}>
                Promotion-Bottom
              </Select.Option>
            </Select>
          </Form.Item>

          {/* <Box>โปรโมชั่น: วันหมดอายุ</Box>
          <Form.Item name={'expired_date'}>
            <DatePicker />
          </Form.Item> */}

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
