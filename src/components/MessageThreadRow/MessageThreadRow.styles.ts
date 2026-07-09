import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const ChatPageMessageRowSx: SxProps<Theme> = [
  {
    width: '100%',
    maxWidth: '640px',
    margin: '0px auto',
  },
];
export const ChatPageLoaderSx: SxProps<Theme> = [
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
];
export const ChatPageStatusRowSx: SxProps<Theme> = [
  (theme) => ({
    width: '100%',
    maxWidth: '640px',
    margin: '0px auto',
    padding: theme.spacing(1),
  }),
];
