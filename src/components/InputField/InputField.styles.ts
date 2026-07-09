import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const InputFieldSx: SxProps<Theme> = [
  (theme) => ({
    width: '100%',
    boxSizing: 'border-box',
    height: '60px',
    padding: theme.spacing(0, 1),
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(0.625),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    '& .MuiInputBase-input': {
      padding: 0,
    },
    '& .MuiInputBase-input::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    '&.Mui-focused': {
      outline: 'none',
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: '#f2f2f2',
      color: theme.palette.text.secondary,
    },
    '&.Mui-disabled .MuiInputBase-input': {
      WebkitTextFillColor: theme.palette.text.secondary,
    },
  }),
];
