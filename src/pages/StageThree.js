import React, { useEffect, Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {List, ListItem, ListItemText} from '@mui/material';
import {Button} from '@mui/material';
import { Box, createTheme, Stack, TextField, Typography, ThemeProvider } from '@mui/material';
import html2canvas from 'html2canvas';

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

  

  const StageThree = ({ items, setSelections, selections, isMediumScreen, handleNextStage, handlePrevStage, stage, stageItems, setUserText }) => {
    const [centerHex, setCenterHex] = useState();
    const movingObjectRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [popoverText, setPopoverText] = useState(null);
    const screenshotRef = useRef();
    const [summary, setSummary] = useState([]); 

    const takeScreenshot = () => {
        const element = screenshotRef.current;
        html2canvas(element)
          .then((canvas) => {
            const image = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = image;
            downloadLink.download = 'screenshot.png';
            downloadLink.click();
          })
          .catch((error) => {
            alert('Screenshot failed, please try again!');
            console.error('Screenshot failed: ', error);
          });
    };

    useEffect(() => {
        let array = [];
        if(stageItems){
            stageItems[0].forEach((itm) => {
                array.push(<ListItem>{itm}</ListItem>);
            });
            setSummary(array);
        }
    }, [stageItems]);

    return (
        <ThemeProvider theme={theme}>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} width={'66vw'} height={'100%'}>
                <Button  variant="contained" onClick={handlePrevStage}>BACK</Button>
                <Stack ref={screenshotRef} alignItems={'center'} justifyContent={'center'} direction={'column'} width={'100%'} height={'80vh'} padding={'20px'} color={'white'}>
                    <Typography sx={isMediumScreen ? {} : { p: 2, color: 'white' }}>
                        {`Write something about ${items[0].toLowerCase()}!`}
                    </Typography>
                    <Box height={isMediumScreen ? 200 : 500} sx={isMediumScreen && {marginTop: 15}}>
                        <TextField onChange={(e) => setUserText(e.target.value)} sx={{height: '350px'}} id="filled-basic" variant="filled" multiline maxRows={10}/>
                    </Box>
                </Stack>
                <Button  variant="contained" onClick={handleNextStage}>{stage === 3 ? 'SHARE' : 'NEXT'}</Button>
            </Stack>
        </ThemeProvider>
    );
};

export default StageThree;
