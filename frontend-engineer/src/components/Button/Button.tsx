import { Button as MuiButton } from '@mui/material';

import { ButtonSx } from './Button.styles';

export type ButtonProps = {
  onClick: () => void;
  content?: string;
  disabled?: boolean;
};

export const Button = ({
  onClick,
  content = 'Send',
  disabled = false,
}: ButtonProps) => {
  return (
    <MuiButton
      data-testid="button"
      disabled={disabled}
      onClick={onClick}
      sx={ButtonSx}
      type="button"
      variant="contained"
    >
      {content}
    </MuiButton>
  );
};
