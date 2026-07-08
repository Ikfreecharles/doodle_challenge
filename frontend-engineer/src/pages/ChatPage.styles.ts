import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const ChatPageRootSx: SxProps<Theme> = [
  {
    height: '100vh',
    backgroundColor: 'background.default',
    backgroundImage: `url('../../assets/Body BG.png')`,
    backgroundRepeat: 'repeat',
    backgroundSize: '768px 590px',
    display: 'flex',
    flexDirection: 'column',
  },
];

export const ChatPageInnerSx: SxProps<Theme> = [
  {
    width: '100%',
    maxWidth: '640px',
    flex: 1,
    overflowY: 'auto',
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0px auto',
  },
];

export const ChatPageComposerSx: SxProps<Theme> = [
  {
    backgroundColor: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    bottom: '0px',
    left: '0px',
    right: '0px',
  },
];

export const ChatPageComposerInnerSx: SxProps<Theme> = [
  (theme) => ({
    width: '100%',
    maxWidth: '640px',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  }),
];
