import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#6928d3',
    },
    secondary: {
      main: '#44ccbe',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
