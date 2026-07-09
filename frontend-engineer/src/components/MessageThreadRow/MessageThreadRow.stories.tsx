import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { ComponentProps } from 'react';
import { MessageThreadRow } from './MessageThreadRow';

const messages = [
  {
    _id: '1',
    author: 'Maddie',
    message: 'I will join the planning session.',
    createdAt: '2026-07-07T18:26:02.625Z',
  },
  {
    _id: '2',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2026-07-07T18:28:02.625Z',
  },
];

const baseArgs = {
  activeUser: 'Maddie',
  ariaAttributes: {
    'aria-posinset': 1,
    'aria-setsize': messages.length,
    role: 'listitem',
  },
  hasNoNewMessages: false,
  index: 0,
  isLoading: false,
  messages,
  style: {
    height: 96,
    position: 'relative',
    width: '100%',
  },
} satisfies ComponentProps<typeof MessageThreadRow>;

const meta = {
  component: MessageThreadRow,
  tags: ['message-thread-row', 'autodocs'],
  render: (args) => (
    <Box sx={{ width: '100%', minHeight: 120 }}>
      <MessageThreadRow {...args} />
    </Box>
  ),
} satisfies Meta<typeof MessageThreadRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ActiveUserMessage: Story = {
  args: baseArgs,
};

export const OtherUserMessage: Story = {
  args: {
    ...baseArgs,
    ariaAttributes: {
      ...baseArgs.ariaAttributes,
      'aria-posinset': 2,
    },
    index: 1,
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    ariaAttributes: {
      ...baseArgs.ariaAttributes,
      'aria-posinset': 3,
      'aria-setsize': 3,
    },
    index: messages.length,
    isLoading: true,
  },
};

export const NoNewMessage: Story = {
  args: {
    ...baseArgs,
    ariaAttributes: {
      ...baseArgs.ariaAttributes,
      'aria-posinset': 3,
      'aria-setsize': 3,
    },
    hasNoNewMessages: true,
    index: messages.length,
  },
};
