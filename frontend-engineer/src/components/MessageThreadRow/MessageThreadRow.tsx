import { Box, CircularProgress, Typography } from '@mui/material';
import { RowComponentProps } from 'react-window';
import { IMessage } from '../../types/types';
import { formatMessageDate } from '../../utils/dateFormat';
import { MessageBox } from '../MessageBox';
import {
  ChatPageMessageRowSx,
  ChatPageStatusRowSx,
  ChatPageLoaderSx,
} from './MessageThreadRow.styles';

export type MessageThreadRowProps = {
  activeUser: string;
  hasNoNewMessages: boolean;
  isLoading: boolean;
  messages: IMessage[];
};

export const MessageThreadRow = ({
  activeUser,
  ariaAttributes,
  hasNoNewMessages,
  index,
  isLoading,
  messages,
  style,
}: RowComponentProps<MessageThreadRowProps>) => {
  const message = messages[index];

  if (message) {
    return (
      <Box
        {...ariaAttributes}
        data-testid="chat-page-message-row"
        style={style}
      >
        <Box
          data-testid="chat-page-message-row-inner"
          sx={ChatPageMessageRowSx}
        >
          <MessageBox
            author={message.author}
            message={message.message}
            sentByActiveUser={message.author === activeUser}
            createdAt={formatMessageDate(message.createdAt)}
          />
        </Box>
      </Box>
    );
  }

  if (isLoading && index === messages.length) {
    return (
      <Box {...ariaAttributes} style={style}>
        <Box sx={ChatPageStatusRowSx}>
          <Box data-testid="chat-page-loader" sx={ChatPageLoaderSx}>
            <CircularProgress size={24} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (hasNoNewMessages) {
    return (
      <Box {...ariaAttributes} style={style}>
        <Box sx={ChatPageStatusRowSx}>
          <Typography
            data-testid="chat-page-no-new-message"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            variant="caption"
          >
            No new message
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};
