import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, Stack, ThemeProvider, useMediaQuery  } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GamePage from './pages/GamePage';
import AppHeader from './components/AppHeader';

const App = () => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');

  const [loggedIn, setLoggedIn] = useState(false)


  const nav = useNavigate()

  useEffect(()=>{

    nav('/game')
 
    
  }, [loggedIn, nav])

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack direction={'column'} alignItems={'center'} justifyContent={'flex-start'} width={isMediumScreen ? 390 : '100vw'} height={isMediumScreen ? 840 : '100vh'}>
      <AppHeader isMediumScreen={isMediumScreen} loggedIn={loggedIn}/>
      <Routes>
        <Route path='/game' element={<GamePage />}/>

      </Routes>
    </Stack>
  </ThemeProvider>
  );
};

export default App;  
