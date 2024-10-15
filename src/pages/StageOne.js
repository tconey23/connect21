import React, { useEffect, Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import Card from '../components/Card';
import { Html } from '@react-three/drei';
import { Button, Stack, Box } from '@mui/material';
import {Popover, Typography} from '@mui/material';

const SetCameraLookAt = ({ targetRef, isMediumScreen, selections }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    console.log(selections.length /5)
    if (targetRef && isMediumScreen) {
      targetRef.position = [selections.length*0.7,selections.length /5,3] 
      camera.position.set(selections.length*0.7,selections.length /5,10)
      camera.lookAt(...targetRef.position);
      camera.fov = 56; 
      camera.zoom = 1
      camera.updateProjectionMatrix(); 
    } else if (targetRef && !isMediumScreen){
      targetRef.position = [6,0,0] 
      camera.position.set(6,0,14)
      camera.lookAt(...targetRef.position)
      camera.fov = 60; 
      camera.zoom = 1
      camera.updateProjectionMatrix();
    }
  }); 

  return null;
};


  const StageOne = ({ items, setSelections, selections, isMediumScreen, handleNextStage, handlePrevStage, stage }) => {
    const [centerHex, setCenterHex] = useState(null);
    const movingObjectRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [popoverText, setPopoverText] = useState(null)
  
    useEffect(() => {
      if (items) {
        console.log(items);
      }
    }, [items]);  
  
    return (

      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box color={'white'}>
      <Typography sx={{ p: 2, marginBottom: '-60px' }}>Now select up to three</Typography>
      </Box>
<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>

<Button variant="contained"  onClick={handlePrevStage}>BACK</Button>

<Canvas style={isMediumScreen ? { width: 600, height: '80vh'} : {width: '100vw'}} shadows >
  <ambientLight intensity={0.8} />
  <directionalLight intensity={5} position={[10, 10, 20]} castShadow />
  <SetCameraLookAt targetRef={centerHex} isMediumScreen={isMediumScreen} selections={items}/>
  <Suspense fallback={null}>
    <Physics gravity={[0, 0, 0]}>
      <Card isMediumScreen={isMediumScreen} setCenterHex={setCenterHex} items={items} movingObjectRef={movingObjectRef} setSelections={setSelections} selections={selections} />
    </Physics>
  </Suspense>
</Canvas>

<Button variant="contained"  onClick={handleNextStage}>{stage === 3 ? 'SUBMIT' : 'NEXT'}</Button>
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
</Stack>
    );
  };
  
  

  export default StageOne