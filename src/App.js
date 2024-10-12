import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import AppHeader from './components/AppHeader';
import NewAccount from './pages/NewAccount';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)


  const nav = useNavigate()

  useEffect(()=>{

    nav('/game')

    
  }, [loggedIn, nav])

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <AppHeader loggedIn={loggedIn}/>
      <Routes>
        <Route path='/game' element={<GamePage />}/>

      </Routes>
    </Stack>
  </ThemeProvider>
  );
};

export default App;
