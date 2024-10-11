import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import {Button} from '@mui/material';
import CardGrid from '../components/CardGrid'
import { getMessage } from '../business/apiCalls';
import Selection from '../components/Selection';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const GamePage = ({}) => {

  const [items, setItems] = useState(null)
  const [selections, setSelections] = useState([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const fetchMessages = async () => {
    setLoading(true)
    const res = await getMessage()
    setItems(JSON.parse(res))
  }

  useEffect(() => {
    if(loading && items){
      setLoading(false)
    }
  }, [loading, items])

  return (
    <Stack 
        direction={'column'} 
        height={'100vh'} 
        width={'100vw'} 
        justifyContent={'center'}
        alignItems={'center'}
        className='game-page'
    >
      <Button onClick={() => setOpen(prev => !prev)} sx={{position: 'absolute', left: -5, height: '100vh'}}></Button>
      <Stack 
        direction={'column'} 
        height={'80%'} 
        width={1200}
        sx={{
          backgroundColor: '#ffffff24',
          borderRadius: 5,
        }}
      >
        <Button onMouseDown={() => fetchMessages()} >Get</Button>
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