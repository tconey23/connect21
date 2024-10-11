import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your primary color
    },
    secondary: {
      main: '#ff4081', // Your secondary color
    },
    background: {
      default: '#1f1f1f',
    },
    buttons: {
        default: '#004a77'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components:{
    MuiTextField:{
        styleOverrides:{
            root:{
                margin: 3,
                borderColor: 'white',
                backgroundColor: 'white',
            }
        }
    },
    MuiImageListItem:{
      styleOverrides:{
        root:{
          justifyContent: 'center',
          alignItems: 'center',
        }
      }
    },
    MuiButton: {
        styleOverrides: {
          root: {
            margin: 5,
            fontFamily: 'cursive',
            color: 'aliceblue',
            paddingLeft: 20,
            paddingRight: 20,
            '&:hover': {
              backgroundColor: '#1976d2', 
              color: 'white',
            },
          },
        },
      },
  },
  spacing: 0,
});

export default theme;
