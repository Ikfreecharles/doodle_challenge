import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

type SentByActiveUserParams = {
  sentByActiveUser: boolean;
};

export const MessageBoxRootSx = ({
  sentByActiveUser,
}: SentByActiveUserParams): SxProps<Theme> => [
  {
    display: 'flex',
    justifyContent: sentByActiveUser ? 'flex-end' : 'flex-start',
  },
];

export const MessageBoxContentSx = ({
  sentByActiveUser,
}: SentByActiveUserParams): SxProps<Theme> => [
  (theme) => ({
    maxWidth: sentByActiveUser ? '75%' : 320,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(0.625),
    backgroundColor: sentByActiveUser
      ? theme.palette.secondary.main
      : theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 3),
    marginBottom: theme.spacing(sentByActiveUser ? 2 : 1.25),
    marginTop: theme.spacing(sentByActiveUser ? 0.75 : 0),
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  }),
];

export const messageBoxCaptionSx: SxProps<Theme> = {
  color: (theme) => theme.palette.text.secondary,
};

export const MessageBoxDateSx = ({
  sentByActiveUser,
}: SentByActiveUserParams): SxProps<Theme> => [
  (theme) => ({
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: sentByActiveUser ? 'flex-end' : 'flex-start',
    marginRight: sentByActiveUser ? '-8px' : 0,
    marginBottom: sentByActiveUser ? '-8px' : 0,
  }),
];
