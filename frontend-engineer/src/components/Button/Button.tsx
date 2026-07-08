import { Button as MuiButton } from '@mui/material';

import './Button.css';

export type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ onClick, disabled = false }: ButtonProps) => {
  return (
    <MuiButton
      className="button"
      data-testid="button"
      disabled={disabled}
      onClick={onClick}
      type="button"
      variant="contained"
    >
      Send
    </MuiButton>
  );
};
