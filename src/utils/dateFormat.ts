import { format } from 'date-fns';

export const formatMessageDate = (date: string): string => {
  return format(new Date(date), 'dd MMMM yyyy HH:mm');
};
