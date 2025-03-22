import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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
