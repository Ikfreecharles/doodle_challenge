import { Box } from '@mui/material';
import { MessageBox } from '../components/MessageBox';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import {
  ChatPageComposerInnerSx,
  ChatPageComposerSx,
  ChatPageInnerSx,
  ChatPageRootSx,
} from './ChatPage.styles';

const messages = [
  {
    author: 'Ninja',
    message: 'Great resource, thanks',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 9:55',
  },
  {
    author: 'I am mister brilliant',
    message: 'THANKSSSS!!!!!',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 10:10',
  },
  {
    author: 'martin57',
    message: 'Thanks Peter',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 10:19',
  },
  {
    author: 'Patricia',
    message: 'Sounds good to me!',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 10:22',
  },
  {
    author: 'Angie',
    message:
      'Hey folks! I wanted to get in touch with you regarding the project. Please, let me know how you plan to contribute.',
    sentByActiveUser: true,
    createdAt: '12 Mar 2018 14:38',
  },
  {
    author: 'Angie',
    message:
      "Does anybody have an update? Just submitted my preferences. Can't wait for the lunch! 😋",
    sentByActiveUser: true,
    createdAt: '12 Mar 2018 14:42',
  },
  {
    author: 'Patricia',
    message:
      'Could everyone vote by tomorrow? Then we can lock in the restaurant reservation.',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 15:01',
  },
  {
    author: 'I am mister brilliant',
    message: 'Hey team! I created a Doodle poll for our monthly team lunch 🍕"',
    sentByActiveUser: false,
    createdAt: '10 Mar 2018 15:10',
  },
];

export const ChatPage = () => {
  return (
    <Box component="main" data-testid="chat-page" sx={ChatPageRootSx}>
      <Box data-testid="chat-page-inner" sx={ChatPageInnerSx}>
        {messages.map((message) => (
          <MessageBox
            key={`${message.author}-${message.createdAt}`}
            author={message.author}
            message={message.message}
            sentByActiveUser={message.sentByActiveUser}
            createdAt={message.createdAt}
          />
        ))}
      </Box>

      <Box data-testid="chat-page-composer" sx={ChatPageComposerSx}>
        <Box
          data-testid="chat-page-composer-inner"
          sx={ChatPageComposerInnerSx}
        >
          <InputField value="" onChange={() => undefined} />
          <Button onClick={() => undefined} />
        </Box>
      </Box>
    </Box>
  );
};
