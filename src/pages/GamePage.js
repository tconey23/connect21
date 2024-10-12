import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
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

  const [items, setItems] = useState(null)
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(selections)
  }, [selections])

  const fetchMessages = async () => {
    setLoading(true)
    // const res = await getMessage()
    // setItems(JSON.parse(res))
    setItems(terms)
  }

  useEffect(() => {
    if(loading && items){
      setLoading(false)
    }
  }, [loading, items])

  useEffect(() => {
    console.log(items)
  }, [items])

  useEffect(() => {
    fetchMessages()
  }, [])

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
        {/* <Button onMouseDown={() => fetchMessages()} >Get</Button> */}
        {items && <CardGrid setOpen={setOpen} items={items} setSelections={setSelections} selections={selections}/>}

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