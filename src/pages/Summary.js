import { useEffect, useState, useRef } from 'react';
import { Stack, List, ListSubheader, ListItem, Button } from '@mui/material';
import html2canvas from 'html2canvas';

const Summary = ({ data, choices, setSummary, setChoices }) => {
  const screenshotRef = useRef();

  function getDeviceType() {
      const ua = navigator.userAgent;
      if (/mobile/i.test(ua)) {
        return 'Mobile';
      }
      if (/tablet/i.test(ua)) {
        return 'Tablet';
      }
      if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        return 'Mobile'; // Detect iOS devices
      }
      return 'Desktop';
    }

    function takeScreenshotAndShare() {
        const deviceType = getDeviceType();
      
        if (deviceType === 'Mobile' || deviceType === 'Tablet') {
          html2canvas(document.body).then(canvas => {
            canvas.toBlob(blob => {
              const file = new File([blob], 'screenshot.png', { type: 'image/png' });
      
              if (navigator.share) {
                // Try sharing the screenshot as a file
                navigator.share({
                  title: 'Screenshot',
                  text: 'Check my connect21 results!',
                  url: 'connect21.vercel.app',
                  files: [file]
                }).then(() => {
                  console.log('Screenshot shared successfully');
                }).catch(error => {
                  // Fallback to text sharing if file sharing fails
                  console.error('Error sharing file, fallback to text:', error);
                  navigator.share({
                    title: 'Screenshot',
                    text: 'Check my connect21 results!',
                    url: 'connect21.vercel.app'
                  }).then(() => {
                    console.log('Text shared successfully as fallback');
                  }).catch(error => {
                    console.error('Error sharing text:', error);
                  });
                });
              } else {
                alert('Sharing is not supported on this device');
              }
            });
          });
        } else {
          console.log('Sharing is not supported on desktop devices.');
        }
      }

  return (
    <Stack
      ref={screenshotRef}
      direction={'row'}
      justifyContent={'center'}
      height={'100vh'}
      width={'100vw'}
      sx={{ fontSize: 11, color: 'white', backgroundColor: '#1f1f1f' }} // updated styles
    >
      {data && choices && (
        <>
          <List>
            <ListSubheader>Selection 1</ListSubheader>
            {choices &&
              choices.map((choice) => (
                <Stack sx={{ marginBottom: '-22px' }} direction={'column'} key={choice}>
                  <ListItem
                    sx={{
                      textDecoration: data[0][1].includes(choice) ? 'none' : 'line-through',
                      fontWeight: data[0][1].includes(choice) ? 1000 : 100,
                      marginLeft: data[0][1].includes(choice) ? '30px' : 0,
                      marginTop: data[0][1].includes(choice) ? '5px' : 0,
                      marginBottom: data[0][1].includes(choice) ? '5px' : 0,
                    }}
                  >
                    {choice}
                  </ListItem>
                </Stack>
              ))}
          </List>

          <List>
            <ListSubheader>Selection 2</ListSubheader>
            {data[0][1] &&
              data[0][1].map((choice) => (
                <Stack sx={{ marginBottom: '-17px' }} direction={'column'} key={choice}>
                  <ListItem
                    sx={{
                      textDecoration: data[0][2].includes(choice) ? 'none' : 'line-through',
                      fontWeight: data[0][2].includes(choice) ? 900 : 100,
                    }}
                  >
                    {choice}
                  </ListItem>
                </Stack>
              ))}
          </List>

          <List>
            <ListSubheader>Selection 3</ListSubheader>
            {data[0][2] &&
              data[0][2].map((choice) => (
                <Stack sx={{ marginBottom: '-17px' }} direction={'column'} key={choice}>
                  <ListItem sx={{ fontWeight: 900 }}>{choice}</ListItem>
                </Stack>
              ))}
          </List>

          <List>
            <ListSubheader>Comments</ListSubheader>
            <Stack>
              <p>{data[1]}</p>
              <Button variant="contained" onClick={() => takeScreenshotAndShare()}>
                SHARE
              </Button>
            </Stack>
          </List>
        </>
      )}
    </Stack>
  );
};

export default Summary;
