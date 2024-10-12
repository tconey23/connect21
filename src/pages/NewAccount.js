import { useEffect, useState } from 'react';
import { Box, Button, Divider, List, ListItem, Select, Stack, StepConnector, Switch, TextField, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { backgroundBlurriness } from 'three/webgpu';


const NewAccount = ({setLoggedIn}) => { 

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [optIn, setOptin] = useState()


  return (
<Stack direction={'column'}>
    <Stack direction={'row'} sx={{ height: '70vh', width: '60vw', paddingTop: '20px', margin: '20px', background: 'white', borderRadius: 10}} justifyContent={'center'} alignItems={'flex-start'}>
      
      <Stack width={300} height={600} direction={'column'}>
      <TextField
          id="outlined-helperText"
          label="User Name"
          defaultValue=" "
          sx={{marginRight: '10px'}}
          />

        <Divider variant="fullWidth" component='div' sx={{height: 50}}/>
            
        <Typography sx={{color: 'black'}} variant={'h6'} >Tell us about yourself*</Typography>
        <Typography sx={{color: 'black'}} variant={'caption'} >This is optional, and is only used to personalize the experience to you</Typography>

        <Divider variant="fullWidth" component='div' sx={{height: 10}}/>

        <List>
        <Typography sx={{color: 'white'}} variant={'caption'}>What are 5 of your favorite things?</Typography>
            <ListItem>
                <TextField />
            </ListItem>
            <ListItem>
                <TextField />
            </ListItem>
            <ListItem>
                <TextField />
            </ListItem>
            <ListItem>
                <TextField />
            </ListItem>
            <ListItem>
                <TextField />
            </ListItem>
        </List>
      </Stack>

      <Stack width={300} height={600} direction={'column'}>
      <TextField
          id="outlined-helperText"
          label="Password"
          defaultValue=" "
          sx={{marginLeft: '10px'}}
          />
           <FormControl sx={{paddingTop: '150px'}} component="fieldset" variant="standard">
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch onChange={(e) => setOptin(e)} name="" />
                }
                label="Opt in to personalization"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch onChange={(e) => setOptin(e)} name="" />
                }
                label="Share results with friends"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                control={
                    <Switch onChange={(e) => setOptin(e)} name="" />
                }
                label="Receive notifications from other users"
                />
            </FormGroup>
           </FormControl>
      </Stack>
    </Stack>
      <Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Box width={200}>
            <Button width={200}>Submit</Button>
        </Box>
        <Box width={200}>
            <Button  onClick={() => setLoggedIn(false)} width={200}>Cancel</Button>
        </Box>
      </Stack>
</Stack>

  );
};

export default NewAccount;