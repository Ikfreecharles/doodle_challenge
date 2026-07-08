import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';

import { MessageBox } from './MessageBox';

const meta = {
  component: MessageBox,
  tags: ['message-box', 'autodocs'],
  render: (args) => (
    <Box sx={{ width: 720 }}>
      <MessageBox {...args} />
    </Box>
  ),
  argTypes: {
    sentByActiveUser: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MessageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromActiveUser: Story = {
  args: {
    author: 'James',
    message:
      'Hey folks! I wanted to get in touch with you regarding the project. Please, let me know how you plan to contribute.',
    sentByActiveUser: true,
    createdAt: '07 July 2026 17:23',
  },
};

export const FromOtherUsers: Story = {
  args: {
    author: 'Luka',
    message: 'Hey team! I created a Doodle poll for our monthly team lunch.',
    sentByActiveUser: false,
    createdAt: '07 July 2026 17:23',
  },
};
