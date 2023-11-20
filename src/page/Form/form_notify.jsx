import { Box, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Form_Notify() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      // รายการชื่อฟิลด์ใน Excel และชื่อฟิลด์ในฐานข้อมูลของคุณ
      const fieldMappings = {
        contract_no: 'contract_no',
        title_noti: 'title_noti',
        body_noti: 'body_noti',
        datetime_noti: 'datetime_noti',
        // เพิ่มชื่อฟิลด์เพิ่มเติมตามความต้องการ
      };

      // แปลงชื่อฟิลด์ Excel ให้ตรงกับชื่อฟิลด์ในฐานข้อมูล
      const mappedData = parsedData.map((row) => {
        const mappedRow = {};
        for (const field in fieldMappings) {
          const dbField = fieldMappings[field];
          mappedRow[dbField] = row[field];
        }
        return mappedRow;
      });

      setData(mappedData);
    };
  };

  const saveData = async () => {
    try {
      for (const record of data) {
        const result = await axios.post(
          import.meta.env.VITE_REACT_APP_API + '/createnotify',
          record
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
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      // เพิ่มการแจ้งเตือนหรือการดำเนินการเพิ่มเติมที่คุณต้องการทำที่นี่
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
          Create Notify
        </Flex>
        <br />
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <Button onClick={saveData}>กดบันทึกเพื่อ Save ข้อมูล</Button>
        <Box>
          {data.length > 0 && (
            <Table size={'sm'}>
              <Thead>
                <Tr>
                  {/* <Th>contract_no</Th>
                  <Th>title_noti</Th>
                  <Th>body_noti</Th>
                  <Th>datetime_noti</Th> */}
                  {Object.keys(data[0]).map((key) => (
                    <Th
                      border={'1px solid black'}
                      textAlign={'center'}
                      key={key}
                    >
                      {key}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data.map((row, index) => (
                  <Tr key={index}>
                    {/* <Td>{row.contract_no}</Td>
                    <Td>{row.title_noti}</Td>
                    <Td>{row.body_noti}</Td>
                    <Td>{row.datetime_noti}</Td> */}
                    {Object.values(row).map((value, index) => (
                      <Td border={'1px solid black'} key={index}>
                        {value}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </>
  );
}
