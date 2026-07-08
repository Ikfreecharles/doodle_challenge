import { Box, Paper, Typography } from '@mui/material';

import { PageShell } from '../components/PageShell';
import { MessageBox } from '../components/MessageBox';

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
        <Box sx={{ minHeight: 480, maxWidth: 640 }}>
          <Typography color="text.secondary">
            Chat messages will render here.
          </Typography>
          <MessageBox
            author={'Ninja'}
            message={'Great resource. Thanks!!!'}
            sentByActiveUser={false}
            createdAt={'07 July 2026 17:23'}
          />
          <MessageBox
            author={'I am mr brilliant'}
            message={'THANKS!!!'}
            sentByActiveUser={false}
            createdAt={'07 July 2026 17:23'}
          />
          <MessageBox
            author={'martin57'}
            message={'Thanks Peter'}
            sentByActiveUser={false}
            createdAt={'07 July 2026 17:23'}
          />
          <MessageBox
            author={'Patricia'}
            message={'Sounds good to me!'}
            sentByActiveUser={false}
            createdAt={'07 July 2026 17:23'}
          />
          <MessageBox
            author={'Angie'}
            message={
              "Just submitted my preferences. Can't wait for the lunch! 😋"
            }
            sentByActiveUser
            createdAt={'07 July 2026 17:25'}
          />
        </Box>
      </Paper>
    </PageShell>
  );
};
