import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import {Button} from '@mui/material';
import CardGrid from '../components/CardGrid'
import { getMessage } from '../business/apiCalls';
import Selection from '../components/Selection';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const terms = ['Family gatherings during holidays', 'A warm cup of tea on a cold day', 'The smell of fresh rain on dry earth', 'The feeling of accomplishment after a challenge', 'A cozy blanket and a good book on a rainy day', 'Random acts of kindness from strangers', 'A heartfelt embrace from a loved one', 'The taste of homemade chocolate chip cookies', 'The joy of singing along to your favorite song', 'The beauty of a colorful sunset', "The comfort of a pet's unconditional love", 'The sound of laughter shared with friends', 'A genuine smile from a stranger passing by', 'The peacefulness of a quiet moment in nature', 'The excitement of exploring a new place', 'The thrill of achieving a personal goal', 'The magic of a starry night sky', 'The memories made on a spontaneous adventure', 'The warmth of a crackling fireplace in winter', 'The connection forged through deep conversations', 'The sweet nostalgia of childhood memories']

const GamePage = ({}) => {

  const [items, setItems] = useState(null)
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(selections)
  }, [selections])

  const fetchMessages = async () => {
    setLoading(true)
    const res = await getMessage()
    setItems(JSON.parse(res))
    // setItems(terms)
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
      <Selection setOpen={setOpen} open={open} selections={selections} setSelections={setSelections}/>
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