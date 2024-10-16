import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, Stack, ThemeProvider, useMediaQuery  } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GamePage from './pages/GamePage';
import AppHeader from './components/AppHeader';
import Summary from './pages/Summary';

const App = () => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');

  const [loggedIn, setLoggedIn] = useState(false)
  const [summary, setSummary] = useState(
  //   [
  //   {
  //   0:[
  //     "Soft moonlight on a quiet beach",
  //     "Spontaneous road trips with no destination",
  //     "Smooth whiskey on a cold night",
  //     "Reckless dancing like nobody's watching"
  //   ],
  //   1:[
  //     "Spontaneous road trips with no destination",
  //     "Smooth whiskey on a cold night",
  //     "Reckless dancing like nobody's watching"
  //   ],
  //   2:[
  //     "Smooth whiskey on a cold night",
  //   ]},
  //   "I like this a whole lot"
  // ]
)
  const [choices, setChoices] = useState()

  const nav = useNavigate()

  useEffect(()=>{

    nav('/game')
 
    
  }, [loggedIn])

  useEffect(() => {
    // console.log(choices)
    if(summary && choices){
      nav('/summary')
    } else {
      nav('/game')
    }
  }, [summary, choices])

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack direction={'column'} alignItems={'center'} justifyContent={'flex-start'} width={isMediumScreen ? 390 : '100vw'} height={isMediumScreen ? 840 : '100vh'}>
      {!summary && <AppHeader isMediumScreen={isMediumScreen} loggedIn={loggedIn}/>}
      <Routes>
        <Route path='/game' element={<GamePage setSummary={setSummary} setChoices={setChoices}/>}/>
        <Route path='/summary' element={<Summary data={summary} choices={choices} setSummary={setSummary} setChoices={setChoices}/>}/>
      </Routes>
    </Stack>
  </ThemeProvider>
  );
};

export default App;  
