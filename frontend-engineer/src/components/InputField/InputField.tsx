import { TextField } from '@mui/material';

import './InputField.css';

export type InputFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const InputField = ({
  value,
  onChange,
  placeholder = 'Type a message',
}: InputFieldProps) => {
  return (
    <TextField
      className="input-field"
      fullWidth
      placeholder={placeholder}
      slotProps={{
        htmlInput: {
          'data-testid': 'input-field',
        },
      }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      size="small"
    />
  );
};
