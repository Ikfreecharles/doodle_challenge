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
    secondary: {
      main: '#fff9c9',
    },
    text: {
      secondary: '#b8b8b8',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
