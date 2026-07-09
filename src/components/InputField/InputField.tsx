import Input from '@mui/material/Input';
import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { InputFieldSx } from './InputField.styles';

export type InputFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  placeholder?: string;
};

export const InputField = ({
  value,
  onChange,
  onKeyDown,
  disabled = false,
  placeholder = 'Message',
}: InputFieldProps) => {
  return (
    <Input
      data-testid="input-field"
      disableUnderline
      disabled={disabled}
      fullWidth
      placeholder={placeholder}
      inputProps={{
        'aria-label': placeholder,
        'data-testid': 'input-field-input',
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      sx={InputFieldSx}
    />
  );
};
