import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['button', 'autodocs'],
  args: {
    disabled: false,
    onClick: () => undefined,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enabled: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByTestId('button');

    await expect(getComputedStyle(button).backgroundColor).toBe(
      'rgb(25, 118, 210)'
    );
  },
};
