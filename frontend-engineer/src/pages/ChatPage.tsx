import { Box, Paper, Typography } from '@mui/material';

import { PageShell } from '../components/PageShell';

export const ChatPage = () => {
  return (
    <PageShell>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}>
          <Typography component="h1" variant="h6">
            Team Chat
          </Typography>
        </Box>
        <Box sx={{ minHeight: 480, p: 2 }}>
          <Typography color="text.secondary">
            Chat messages will render here.
          </Typography>
        </Box>
      </Paper>
    </PageShell>
  );
};
