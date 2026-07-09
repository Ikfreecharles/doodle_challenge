import { Box, Paper, Typography } from '@mui/material';
import {
  MessageBoxContentSx,
  MessageBoxDateSx,
  MessageBoxRootSx,
  messageBoxCaptionSx,
} from './MessageBox.styles';

export type MessageBoxProps = {
  author: string;
  message: string;
  sentByActiveUser: boolean;
  createdAt: string;
};

export const MessageBox = ({
  author,
  message,
  sentByActiveUser,
  createdAt,
}: MessageBoxProps) => {
  const messageLabel = sentByActiveUser
    ? 'Message from you'
    : `Message from ${author}`;

  return (
    <Box data-testid="message-box" sx={MessageBoxRootSx({ sentByActiveUser })}>
      <Paper
        aria-label={messageLabel}
        component="article"
        data-testid="message-box-content"
        sx={MessageBoxContentSx({ sentByActiveUser })}
        elevation={0}
      >
        {!sentByActiveUser && (
          <Typography
            data-testid="message-box-author"
            variant="caption"
            component="p"
            sx={messageBoxCaptionSx}
          >
            {author}
          </Typography>
        )}
        <Typography data-testid="message-box-message" variant="body1">
          {message}
        </Typography>
        <Typography
          component="time"
          dateTime={createdAt}
          data-testid="message-box-date"
          variant="caption"
          sx={MessageBoxDateSx({ sentByActiveUser })}
        >
          {createdAt}
        </Typography>
      </Paper>
    </Box>
  );
};
