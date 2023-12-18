import { Form, Input } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useState } from 'react';
const { TextArea } = Input;
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export default function Form_salehome() {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const history = useNavigate();

  const onFinish = async (values) => {
    // values.img_show = fileName;
    values.img_all = selectedImages;
    let result = await axios.post(
      import.meta.env.VITE_REACT_APP_API + '/createsalehome',
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
          Create SaleHome
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

          {/* <Box>อัพโหลดรูปภาพ</Box>
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
                src={
                  import.meta.env.VITE_REACT_APP_API +
                  '/public/image/' +
                  fileName
                }
                alt=""
              />
            </div>
          )} */}

          <Box>อัพโหลดหลายรูปภาพ</Box>
          <Form.Item>
            <input
              type={'file'}
              onChange={async (e) => {
                let formData = new FormData();
                console.log('Selected Files:', e.target.files);
                for (let i = 0; i < e.target.files.length; i++) {
                  formData.append('image', e.target.files[i]);
                }
                console.log('Selected Images:', selectedImages);
                try {
                  let resUpload = await axios.post(
                    import.meta.env.VITE_REACT_APP_API + '/upload/img_all',
                    formData
                  );
                  console.log('Upload Response:', resUpload);
                  if (resUpload?.data?.status) {
                    console.log(
                      'Selected Images Updated:',
                      resUpload?.data?.data?.selectedImages
                    );
                    setSelectedImages(resUpload?.data?.data?.selectedImages);
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
              multiple
              required
            />
          </Form.Item>
          {selectedImages && (
            <div>
              {selectedImages.map((image, index) => (
                <img
                  className="imgview"
                  key={index}
                  src={
                    import.meta.env.VITE_REACT_APP_API +
                    '/public/img_all/' +
                    image
                  }
                  alt={`Image ${index + 1}`}
                />
              ))}
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
