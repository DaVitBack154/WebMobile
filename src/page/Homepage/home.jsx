import { Box, Flex } from '@chakra-ui/react';
import TableRegister from '../TablePage/tableregister';
import TablereqUser from '../TablePage/tablerequser';
import TablePromotion from '../TablePage/tablepromotion';
import Sidebar from '../../components/sidebar';
import TableNotify from '../TablePage/tablenotify';
import TableSaleHome from '../TablePage/tablesalehome';

export default function Home() {
  return (
    <>
      {/* <Box w={'100%'}>
        <br />
        <TableRegister />
        <TablereqUser />
        <TablePromotion />
      </Box> */}

      <Flex>
        <Box w={'15%'} bg={'red.100'}>
          <Sidebar />
        </Box>
        <Box w={'75%'}>
          <br />
          <TableRegister />
          <TablereqUser />
          <TablePromotion />
          <TableNotify />
          <TableSaleHome />
        </Box>
      </Flex>
    </>
  );
}
