import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
};

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};
