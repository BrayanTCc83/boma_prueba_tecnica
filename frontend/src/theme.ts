import { createTheme } from '@mui/material/styles';
import { red, green, amber, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(77, 31, 99)',
      light: 'rgb(103, 58, 146)',
      dark: 'rgb(49, 16, 64)',
      contrastText: '#fff'
    },
    secondary: {
      main: '#5e35b1',
      light: '#9575cd',
      dark: '#311b92',
      contrastText: '#fff'
    },
    error: {
      main: red[600],
    },
    warning: {
      main: amber[700],
    },
    success: {
      main: green[600],
    },
    grey: {
      100: grey[100],
      300: grey[300],
      500: grey[500],
      700: grey[700],
      900: grey[900],
    },
    background: {
      default: grey[50],
      paper: '#fff'
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
});
export default theme;