import Input from '@mui/material/Input';

import { InputFieldSx } from './InputField.styles';

export type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const InputField = ({
  value,
  onChange,
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
      onChange={(event) => onChange(event.target.value)}
      sx={InputFieldSx}
    />
  );
};
