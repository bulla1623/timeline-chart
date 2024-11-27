import { createTheme } from '@mui/material';
import { USER_COLORS } from '../constants/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    user: {
      user23: USER_COLORS[23],
      user24: USER_COLORS[24],
      user27: USER_COLORS[27],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
