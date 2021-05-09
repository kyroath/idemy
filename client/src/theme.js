import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main : '#017a9b'
    },
    secondary: {
      main: '#2ba624',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;