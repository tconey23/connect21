import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Login from '../components/Login';

const LandingPage = ({ setLoggedIn }) => {
  return (
    <Stack 
        direction={'column'} 
        height={'95vh'} 
        width={'100vw'} 
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
            backgroundColor: (theme) => theme.palette.background.default
        }}
    > 
      <Stack 
        direction={'column'} 
        height={700} 
        width={1200} 
        sx={{backgroundColor: (theme) => theme.palette.background.default, 
                border: '1px solid white'
        }}
      >
        <Login  setLoggedIn={setLoggedIn}/>
      </Stack>
    </Stack>
  );
};

export default LandingPage;