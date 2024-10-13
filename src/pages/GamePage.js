import { useEffect, useState } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import {Button} from '@mui/material';
import CardGrid from '../components/CardGrid'
import { getMessage } from '../business/apiCalls';
import Selection from '../components/Selection';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
]


const GamePage = ({}) => {

  const messages = [
    "Select all of the things you love",
    "Now select up to three",
    "Now choose your FAVORITE",
    "Write about your FAVORITE thing!"
  ]

  const [items, setItems] = useState(null)
  const [currentItems, setCurrentItems] = useState([])
  const [stage, setStage] = useState(0)
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [minSelections, setMinSelections] = useState(3)
  const [maxSelections, setMaxSelections] = useState()
  const [userMessage, setUserMessage] = useState()
  const [userText, setUserText] = useState('')

  const fetchMessages = async () => {
    setLoading(true)
    // const res = await getMessage()
    // setItems(JSON.parse(res))
    setItems(terms)
    setCurrentItems(terms)
  }

  useEffect(() => {
    switch(stage){
      case 0: setMinSelections(3)
              setMaxSelections(21)
      break;
      case 1: setMinSelections(3)
              setMaxSelections(3)
      break;
      case 2: setMinSelections(1)
              setMaxSelections(1)
      break;
    }

    setUserMessage(messages[stage])

  }, [stage])

  useEffect(() => {
    if(loading && items){
      setLoading(false)
    }
  }, [loading, items])

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleNextClick = () => {
    setCurrentItems(selections)
    setStage(prev => prev +1)

  }

  return (
    <Stack 
        direction={'row'} 
        height={'100vh'} 
        width={'100vw'} 
        justifyContent={'center'}
        alignItems={'center'}
        className='game-page'
    >
      <Stack 
        direction={'column'} 
        height={'80%'} 
        width={1200}
        sx={{
          backgroundColor: '#ffffff24',
          borderRadius: 5,
        }}
      >
        <Stack height={100} justifyContent={'center'} alignItems={'center'}>
          {stage < 3 &&
          <>
          {selections.length >= minSelections && selections.length <= maxSelections && stage !=3 ? 
            <Button onClick={() => handleNextClick()}>NEXT</Button> :
            <Button disabled>NEXT</Button>
          }
          </>}
          <Stack height={100} justifyContent={'center'} alignItems={'center'}>
            {stage ==3 && userText.length > 10 && <Button>SUBMIT</Button>}
          </Stack>
          <h3 style={{color: 'white'}}>{userMessage}</h3>
        </Stack>


        {currentItems && stage == 0 && <CardGrid key={stage} setOpen={setOpen} items={currentItems} setSelections={setSelections} selections={selections}/>}
        {currentItems && stage == 1 && <CardGrid key={stage} setOpen={setOpen} items={currentItems} setSelections={setSelections} selections={selections}/>}
        {currentItems && stage == 2 && <CardGrid key={stage} setOpen={setOpen} items={currentItems} setSelections={setSelections} selections={selections}/>}
        
        {stage == 3 && 
        <Stack height={'100%'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}>
          <h3 style={{color: 'white'}}>{selections}</h3>
            <TextField
              id="outlined-multiline-flexible"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              multiline
              sx={{width: '500px'}}
              maxRows={10}
            />
          </Stack>
          }

      </Stack>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
};

export default GamePage;
