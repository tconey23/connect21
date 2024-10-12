import { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import {Button} from '@mui/material';

const Login = ({setLoggedIn}) => {


    const handleLogin = () => {
        setLoggedIn(true)
    }

  return (
    <Stack 
        direction={'column'} 
        sx={{ height: '100%', width: '100%' }}
        justifyContent={'center'}
        alignItems={'center'}
    >
        <Stack direction={'row'}>
            <TextField placeholder='Login'/>
            <TextField placeholder='Password'/>
        </Stack>
        <Button 
            sx={{background: (theme)=> theme.palette.buttons.default}}
            onMouseDown={() => handleLogin()}
        > 
            Enter
        </Button>
        <Button 
            sx={{background: (theme)=> theme.palette.buttons.default}}
            onMouseDown={() => setLoggedIn('new')}
        > 
            Create Account
        </Button>
    </Stack>
  );
};

export default Login;
