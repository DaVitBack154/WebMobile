import { Form, Input, Select } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
const { TextArea } = Input;

export default function FormUpdateSaleHome() {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const init = async () => {
      try {
        let dataID = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/getsalehome/' + _id
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
      import.meta.env.VITE_REACT_APP_API + '/updatesalehome/' + _id,
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
          UpdateSaleHome
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Box>รหัสทรัพย์</Box>
          <Form.Item
            name="number_home"
            rules={[
              {
                required: true,
                message: 'รหัสทรัพย์',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Box>ชื่อ-บ้าน</Box>
          <Form.Item
            name="name_home"
            rules={[
              {
                required: true,
                message: 'ชื่อบ้านที่จะขาย',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Box>จังหวัด</Box>
          <Form.Item
            name="province"
            rules={[
              {
                required: true,
                message: 'จังหวัด',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Box>ที่อยู่บ้าน</Box>
          <Form.Item
            name="location_home"
            rules={[
              {
                required: true,
                message: 'ที่อยู่บ้าน',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Box>ราคาบ้าน</Box>
          <Form.Item
            name="price_home"
            rules={[
              {
                required: true,
                message: 'ราคาบ้าน',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Box>รายละเอียดบ้าน</Box>
          <Form.Item
            name="detail_home"
            rules={[
              {
                required: true,
                message: 'รายละเอียดบ้าน',
              },
            ]}
          >
            <TextArea rows={4} minLength={20} />
          </Form.Item>

          <Box>Status</Box>
          <Form.Item
            name={'status_home'}
            rules={[
              {
                required: true,
                message: 'Please choise',
              },
            ]}
          >
            <Select className="" placeholder="Please-Choise">
              <Select.Option value={'ON'}>ON</Select.Option>
              <Select.Option value={'OFF'}>OFF</Select.Option>
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
