import { Box } from '@chakra-ui/react';
import TableRegister from '../TablePage/tableregister';
import TablereqUser from '../TablePage/tablerequser';
import TablePromotion from '../TablePage/tablepromotion';
import Sidebar from '../../components/sidebar';
import TableNotify from '../TablePage/tablenotify';
import TableSaleHome from '../TablePage/tablesalehome';
import TablePhoneOTP from '../TablePage/tablephoneotp';

export default function Home() {
  return (
    <>
      {/* <Box w={'100%'}>
        <br />
        <TableRegister />
        <TablereqUser />
        <TablePromotion />
      </Box> */}

      <Box w={'full'}>
        <Sidebar />
        <TableRegister />
        <TablereqUser />
        <TablePromotion />
        <TableNotify />
        <TableSaleHome />
        <TablePhoneOTP />
      </Box>
    </>
  );
}
