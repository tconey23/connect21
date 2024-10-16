import { useEffect, useState } from 'react';
import { Box, createTheme, Stack, ThemeProvider, useMediaQuery } from '@mui/material';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CardGrid from '../components/CardGrid';
import StageOne from './StageOne';
import StageTwo from './StageTwo';
import StageThree from './StageThree';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useTexture } from '@react-three/drei';
import Summary from './Summary';

const terms = [
  "Adventure-filled weekends",
  "Rebel souls with kind hearts",
  "Stormy skies before the rain",
  "Late-night conversations that feel like therapy",
  "Coffee stronger than your ex's new relationship",
  "Old books with notes scribbled in the margins",
  "Vintage vinyl records with scratchy edges",
  "Anonymously helping someone in need",
  "The smell of freshly baked bread",
  "Quirky street art in unexpected places",
  "Reckless dancing like nobody's watching",
  "Rain tapping on a tin roof",
  "Crowded dive bars with sticky floors",
  "Smooth whiskey on a cold night",
  "The feeling after a long, intense workout",
  "Spontaneous road trips with no destination",
  "Creating something from nothing",
  "Forgotten childhood memories that suddenly resurface",
  "Soft moonlight on a quiet beach",
  "Losing track of time in a great book",
  "Imperfectly perfect moments with loved ones"
];

const responsiveTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          [createTheme().breakpoints.down('sm')]: {
            fontSize: '0.75rem', // Smaller font size for small screens
          },
        },
      },
    },
  },
});

const GamePage = ({setSummary, setChoices}) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:960px)');

  const [items, setItems] = useState(terms); // Initial items
  const [selections, setSelections] = useState([]); // Selections for the current stage
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [userText, setUserText] = useState(null)
  const [stageItems, setStageItems] = useState({
    0: ["The feeling of sunshine on your face", "The sound of waves crashing on the shore", "A warm cup of tea on a cold day", "A sky full of stars on a clear night"],
    1: ["The feeling of sunshine on your face", "The sound of waves crashing on the shore", "A warm cup of tea on a cold day"],
    2: ["The feeling of sunshine on your face"],
    3: [], 
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [popoverText, setPopoverText] = useState(null)

  const minMax = {
    0: {
      min: 3,
      max: 21
    },
    1: {
      min: 3,
      max: 3
    },
    2: {
      min: 1,
      max: 1
    },
    3: {
      min: 1,
      max: 1
    }
  }

  const fetchMessages = async () => {
    const res = await fetch('https://raw.githubusercontent.com/tconey23/connect21_be/refs/heads/main/ServerData/gptResp.json')
    const data = await res.json()
    const final = await JSON.parse(data.choices[0].message.content)
    if(final){
      setItems(final)
      
    }
  }

  useEffect(() => {
    fetchMessages()
    // console.log(isMediumScreen)
  }, [])

  useEffect(() => {
    if(items){
      setChoices(items)
    }
  }, [items])

  useEffect(() => {
    // console.log(userText)
  }, [userText])
  
  useEffect(() => {
    if (selections.length > 0) {
      setStageItems((prevStageItems) => ({
        ...prevStageItems, 
        [stage]: selections,
      }));
    }
  }, [stage, selections]);

  useEffect(() => {
  // console.log(`stage ${stage} items`,stageItems[stage])
  }, [stage, stageItems, selections]);

  const handleNextStage = (event) => {
    if (stage < 3 && selections.length >= minMax[stage].min && selections.length <= minMax[stage].max) {
      setStage((prev) => prev + 1);
      setSelections([]);
    } else if (stage < 3 && selections.length >= minMax[stage].min && selections.length >= minMax[stage].max){
      setAnchorEl(event.currentTarget)
      setPopoverText(`You cannot select more than ${minMax[stage].max} item(s)`)
    } else if (stage < 3 && selections.length <= minMax[stage].min && selections.length <= minMax[stage].max){
      setAnchorEl(event.currentTarget)
      setPopoverText(`You must select a minimum of ${minMax[stage].min} item(s)`)
    }else if (stage === 3 && userText && userText.length > 10){
      setSummary([stageItems, userText])
    }
    
  };

  const handlePrevStage = () => {
    if (stage > 0) {
      setStage((prev) => prev - 1);
      setSelections([]); 
    }
  };

  useEffect(() => {
    if(popoverText){
      if(open) {
        console.log('true')
        setTimeout(() => {
          setOpen(false)
          setPopoverText(null)
        }, 2000);
      } else {
        setOpen(true)
      }
    }
  }, [popoverText, open])

  return (
  <ThemeProvider theme={responsiveTheme}>
    <Stack
      direction={'column'}
      height={isMediumScreen ? '100vh' : '100vh'}
      width={isMediumScreen ? '90vw' : '100vw'}
      justifyContent={'center'}
      alignItems={'center'}
      className='game-page'
      
      >
{      <Stack
        direction={'column'}
        height={isMediumScreen ? '80vh' : '100vh'}
        width={isMediumScreen ? '80vw' : '100vw'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundColor: '#ffffff24',
          borderRadius: 5,
        }}
        marginBottom={'40px'}
        >
        {items && (
          <>
            {stage === 0 && (
              <CardGrid
              stage={stage}
              handleNextStage={handleNextStage}
              handlePrevStage={handlePrevStage}
              setOpen={setOpen}
              items={items}
              setSelections={setSelections}
              selections={selections}
              isMediumScreen={isMediumScreen}
              />
            )}
            {stage === 1 && stageItems[0] && (
              <StageOne
              stage={stage}
              handleNextStage={handleNextStage}
              handlePrevStage={handlePrevStage}
              setOpen={setOpen}
              items={stageItems[0]}
              setSelections={setSelections}
              selections={selections}
              isMediumScreen={isMediumScreen}
              />
            )}
            {stage === 2 && stageItems[1] &&  (
              <StageTwo
              stage={stage}
              handleNextStage={handleNextStage}
              handlePrevStage={handlePrevStage}
              setOpen={setOpen}
              items={stageItems[1]}
              setSelections={setSelections}
              selections={selections}
              isMediumScreen={isMediumScreen}
              />
            )}
            {stage === 3 && stageItems[2] &&  (
              <StageThree
              stage={stage}
              handleNextStage={handleNextStage}
              handlePrevStage={handlePrevStage}
              setOpen={setOpen}
              items={stageItems[2]}
              setSelections={setSelections}
              selections={selections}
              isMediumScreen={isMediumScreen}
              stageItems={stageItems}
              setUserText={setUserText}
              />
            )}
          </>
        )}
      </Stack> 
      }
{ !isMediumScreen &&
    <Stack direction={'row'}>
    <Button onClick={handlePrevStage}>BACK</Button>
    <Button onClick={handleNextStage}>{stage === 3 ? 'SUBMIT' : 'NEXT'}</Button>
    <Popover
      id={'popover'}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ 
        vertical: 'bottom', 
        horizontal: 'left',
      }} 
      >
      <Typography sx={{ p: 2 }}>{popoverText}</Typography>
    </Popover>
  </Stack>
    }
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  </ThemeProvider>
  );
};

export default GamePage;
