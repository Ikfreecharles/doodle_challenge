import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

import { theme } from './theme';

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(activeTheme) => ({
          ':root': {
            '--doodle-palette-primary-main': activeTheme.palette.primary.main,
            '--doodle-palette-primary-contrast-text':
              activeTheme.palette.primary.contrastText,
            '--doodle-palette-background-paper':
              activeTheme.palette.background.paper,
            '--doodle-palette-text-primary': activeTheme.palette.text.primary,
            '--doodle-palette-divider': activeTheme.palette.divider,
            '--doodle-shape-border-radius': `${activeTheme.shape.borderRadius}px`,
            '--doodle-spacing-1': activeTheme.spacing(1),
            '--doodle-spacing-1-5': activeTheme.spacing(1.5),
          },
        })}
      />
      {children}
    </ThemeProvider>
  );
};
