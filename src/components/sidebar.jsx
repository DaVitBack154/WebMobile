import { Box, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetState } from '../store/actionDispatch';
import { persistor } from '../store/index';

export default function Sidebar() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const history = useNavigate();

  const onSignOutPress = async () => {
    await persistor.purge();
    dispatch(resetState());
    localStorage.removeItem('token');
    history('/');
    window.location.reload();
  };
  return (
    <>
      <Box h={'100vh'}>
        <Box textAlign={'center'} display={'flex'} justifyContent={'center'}>
          <img src="/chase.png" width={180} alt="logocompany" />
        </Box>
        <Box p={1}>
          <hr />
        </Box>

        <Box>DashBoard</Box>
        <Box>{account?.profile?.EUserName}</Box>
        <Button
          onClick={() => {
            onSignOutPress();
          }}
        >
          Log out
        </Button>
      </Box>
    </>
  );
}
