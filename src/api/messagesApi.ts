import {
  FetchMessagesParams,
  IMessage,
  SendMessagePayload,
} from '../types/types';
import { getAppConfig } from '../config/env';

export const fetchMessages = async (
  params: FetchMessagesParams,
  signal?: AbortSignal
): Promise<IMessage[]> => {
  const { apiBaseUrl, authToken } = getAppConfig();
  const { limit, after } = params;
  const urlParams = new URLSearchParams();
  urlParams.set('limit', limit.toString());
  if (after) {
    urlParams.set('after', after);
  }
  const messagesUrl = `${apiBaseUrl}/messages?${urlParams}`;

  const response = await fetch(messagesUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch chat messages.');
  }

  return (await response.json()) as IMessage[];
};

export const sendMessage = async (
  messagePayload: SendMessagePayload
): Promise<IMessage> => {
  const { apiBaseUrl, authToken } = getAppConfig();

  const response = await fetch(`${apiBaseUrl}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messagePayload),
  });

  if (!response.ok) {
    throw new Error('Unable to send chat message.');
  }

  return (await response.json()) as IMessage;
};
