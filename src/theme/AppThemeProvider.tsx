import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { theme } from './theme';

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
