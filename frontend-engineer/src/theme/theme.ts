import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  palette: {
    background: {
      default: '#f7f7f5',
    },
    primary: {
      main: '#1c8fca',
    },
    secondary: {
      main: '#fff9c9',
    },
    warning: {
      main: '#ff7f65',
    },
    text: {
      secondary: '#b8b8b8',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
