import { createMuiTheme } from '@material-ui/core/styles';
import { red , grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main : '#017a9b',
    },
    secondary: {
      main: '#2ba624',
    },
    error: {
      main: red.A400,
    },
    textPrimary: {
      main: grey.A400
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;