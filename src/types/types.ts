export const defaultMessageRowHeight = 96;
export interface IMessage {
  _id: string;
  author: string;
  message: string;
  createdAt: string;
}
export type FetchMessagesParams = { limit: number; after?: string };
export type SendMessagePayload = {
  author: string;
  message: string;
};
export type ChatPageProps = {
  messages: IMessage[];
  onLoadNextMessages: () => void;
  onSendMessage: (message: string) => void;
  activeUser: string;
  isLoading?: boolean;
  isSending?: boolean;
  hasNoNewMessages?: boolean;
};
