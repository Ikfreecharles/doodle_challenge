import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputField } from './InputField';

const meta = {
  component: InputField,
  tags: ['input-field', 'autodocs'],
  args: {
    value: '',
    placeholder: 'Type a message',
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
