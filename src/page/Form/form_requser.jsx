import { Form, Input, Select } from 'antd';
import axios from 'axios';
import swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

export default function FromReqUser() {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { _id } = useParams();
  const [dataReq, setDataReq] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        let dataID = await axios.get(
          import.meta.env.VITE_REACT_APP_API + '/get_requser/' + _id
        );
        if (dataID.data.status) {
          let data = dataID.data.data;
          form.setFieldsValue(data);
          setDataReq(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [form, _id]);

  const onFinish = async (values) => {
    let result = await axios.put(
      import.meta.env.VITE_REACT_APP_API + '/update_requser/' + _id,
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
          ReqUserDocument
        </Flex>
        <br />
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Flex w={'100%'}>
            <Box w={'50%'}>
              <Form.Item name={'name'} label="Name">
                <Input readOnly />
              </Form.Item>
            </Box>
            <Box w={'50%'} ml={2}>
              <Form.Item name={'surname'} label="Sur-Name">
                <Input readOnly />
              </Form.Item>
            </Box>
          </Flex>

          <Flex w={'100%'}>
            <Box w={'50%'}>
              <Form.Item name={'id_card'} label="ID-Card">
                <Input readOnly />
              </Form.Item>
            </Box>
            <Box w={'50%'} ml={2}>
              <Form.Item name={'no_contract'} label="เลขที่สัญญา">
                <Input readOnly />
              </Form.Item>
            </Box>
          </Flex>

          <Flex w={'100%'}>
            <Box w={'50%'}>
              <Form.Item name={'list_req'} label="รายการขอ">
                <Input readOnly />
              </Form.Item>
            </Box>
            <Box w={'50%'} ml={2}>
              <Form.Item name={'receive_no'} label="เลขที่ใบเสร็จ">
                <Input readOnly />
              </Form.Item>
            </Box>
          </Flex>

          {dataReq.sent_emailuser != null ? (
            <>
              <Form.Item name={'sent_emailuser'} label="ส่งทาง อีเมล">
                <Input readOnly />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name={'sent_addressuser'} label="ส่งทาง ที่อยู่">
                <Input readOnly />
              </Form.Item>
              <Flex>
                <Box w={'50%'}>
                  <Form.Item name={'district'} label="เขต">
                    <Input readOnly />
                  </Form.Item>
                </Box>
                <Box w={'50%'} ml={2}>
                  <Form.Item name={'subdistrict'} label="แขวง">
                    <Input readOnly />
                  </Form.Item>
                </Box>
              </Flex>
              <Flex>
                <Box w={'50%'}>
                  <Form.Item name={'provin'} label="จังหวัด">
                    <Input readOnly />
                  </Form.Item>
                </Box>
                <Box w={'50%'} ml={2}>
                  <Form.Item name={'postcode'} label="รหัสไปรณีย์">
                    <Input readOnly />
                  </Form.Item>
                </Box>
              </Flex>
            </>
          )}

          <Form.Item
            name={'status_req'}
            rules={[
              {
                required: true,
                message: 'Please choise',
              },
            ]}
          >
            <Select className="" placeholder="Please-Choise">
              <Select.Option value={'Process'}>Process</Select.Option>
              <Select.Option value={'Success'}>Success</Select.Option>
              <Select.Option value={'Cancel'}>Cancel</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="remark" label="remark">
            <Input />
          </Form.Item>

          <Form.Item>
            <Box mt={3}>
              <Button type="submit" mr={3}>
                ➤ SAVE
              </Button>

              <Button
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
