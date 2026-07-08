import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const ButtonSx: SxProps<Theme> = [
  (theme) => ({
    height: '60px',
    borderRadius: theme.spacing(0.625),
    padding: theme.spacing(0, 3),
    margin: theme.spacing(1, 1, 1, 0),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
    fontSize: '18px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#f36f55',
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: '#d8d8d8',
      color: theme.palette.common.white,
    },
  }),
];
