import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';

import { InputField } from './InputField';

const meta = {
  component: InputField,
  tags: ['input-field', 'autodocs'],
  render: (args) => (
    <Box sx={{ width: 640 }}>
      <InputField {...args} />
    </Box>
  ),
  args: {
    value: '',
    placeholder: 'Message',
    disabled: false,
    onChange: () => undefined,
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    value: 'I can make 12:30 work.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '',
  },
};
