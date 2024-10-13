import React, { useEffect, Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import Card from '../components/Card';
import { Box, createTheme, Stack, TextField, Typography, ThemeProvider } from '@mui/material';

const theme = createTheme ({
    components: {
        MuiInputBase:{
            styleOverrides:{
                root:{
                    width: '500px',
                    maxHeight: 160
                }
            }
        },
        MuiTextField:{ 
            styleOverrides:{
                root:{ 
                    width: '500px',
                    height: '500px'
                }
            }
        },
        MuiBox:{
            styleOverrides:{
                root:{
                    width: '500px',
                    height: '500px'
                }
            }
        }
    }
})

const SetCameraLookAt = ({ centerHex }) => {
    const { camera } = useThree();
  
    useFrame(() => {
      if (centerHex && centerHex.position) {
        // Set camera position to a fixed location, adjust as needed
        camera.position.set(0, 0, 8);
        // Make the camera look at the centerHex
        camera.lookAt(centerHex.position[0], centerHex.position[1], centerHex.position[2]);
      }
    });
  
    return null;
  };

  

const StageThree = ({items, setSelections, selections, isMediumScreen}) => {
    const [centerHex, setCenterHex] = useState()
    const movingObjectRef = useRef();
    
    const stageThreeItems = items.slice(0, 21); // 21 items for stage one
    
    return (
        <>
        <ThemeProvider theme={theme}>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'column'} width={'100%'} height={'80vh'} padding={'100px'}>
        <Typography sx={isMediumScreen ? {} : { p: 2, color: 'white' }}>{`Write something about ${items[0].toLowerCase()}!`}</Typography>
            <Box height={isMediumScreen ? 200 : 500} sx={isMediumScreen && {marginTop: 0}}>
                <TextField sx={{height: '350px'}} id="filled-basic" variant="filled" multiline maxRows={10}/>
            </Box>
        </Stack>
        </ThemeProvider>
        </>
    );
  };

export default StageThree;