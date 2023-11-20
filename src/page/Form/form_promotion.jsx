import { Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useState } from 'react';
const { TextArea } = Input;
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function Form_promotion() {
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState(null);
  const history = useNavigate();

  const onFinish = async (values) => {
    values.image = fileName;
    let result = await axios.post(
      import.meta.env.VITE_REACT_APP_API + '/promotion',
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
          Create Promotion
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Box>หัวข้อ-ข้อความ</Box>
          <Form.Item
            name="title_pro"
            rules={[
              {
                required: true,
                message: 'ควรมีตัวอักษรมากกว่าหรือเท่ากับ 50 ตัว',
              },
            ]}
          >
            <Input minLength={20} />
          </Form.Item>

          <Box>เนื้อหาข้อความ</Box>
          <Form.Item
            name="content_pro"
            rules={[
              {
                required: true,
                message: 'ควรมีตัวอักษรมากกว่าหรือเท่ากับ 50 ตัว',
              },
            ]}
          >
            <TextArea rows={4} minLength={20} />
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

          <Flex mt={2}>
            <Box>โปรโมชั่น: วันหมดอายุ </Box>
            <Box textColor={'red'}>
              *** ถ้าไม่มีวันหมดอายุไม่จำเป็นต้องกรอกข้อมูล
            </Box>
          </Flex>
          <Form.Item name={'expired_date'}>
            <DatePicker />
          </Form.Item>

          <Box textColor={'red'} fontSize={'17'}>
            ****รบกวนอ่านก่อนอัพโหลดรูปภาพ****
          </Box>
          <Box textColor={'red'} mb={2} fontSize={'16'}>
            ถ้าเลือกหัวข้อโปรโมชั่นด้านบนรูปภาพจะต้องมีขนาด width 1000 x 500
            เป็นต้นไป แต่ถ้าเลือกหัวข้อโปรโมชั่นด้านล่างต้องมีขนาด 600 x 500
            เป็นต้นไป
          </Box>
          <Box>อัพโหลดรูปภาพ</Box>
          <Form.Item>
            <input
              type={'file'}
              onChange={async (e) => {
                try {
                  let formData = new FormData();
                  formData.append('image', e.target.files[0]);

                  let resUpload = await axios.post(
                    import.meta.env.VITE_REACT_APP_API + '/upload/image',
                    formData
                  );
                  if (resUpload?.data?.status) {
                    setFileName(resUpload?.data?.data?.filename);
                    swal.fire({
                      title: '',
                      text: resUpload?.data?.message,
                      icon: 'success',
                      confirmButtonText: 'X',
                    });
                  } else {
                    swal.fire({
                      title: '',
                      text: resUpload?.data?.message,
                      icon: 'error',
                      confirmButtonText: 'X',
                    });
                  }
                } catch (error) {
                  if (error.response.status === 401) {
                    window.location.href = '/login';
                  }
                }
              }}
              required
            />
          </Form.Item>
          {fileName && (
            <div className="image-repair">
              <img
                className="img-up"
                src={
                  import.meta.env.VITE_REACT_APP_API +
                  '/public/image/' +
                  fileName
                }
                alt=""
              />
            </div>
          )}

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
