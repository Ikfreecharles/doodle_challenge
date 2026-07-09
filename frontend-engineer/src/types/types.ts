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
