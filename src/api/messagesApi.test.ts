import { fetchMessages, sendMessage } from './messagesApi';
import { IMessage, SendMessagePayload } from '../types/types';

jest.mock('../config/env', () => ({
  getAppConfig: () => ({
    apiBaseUrl: 'http://localhost:3000/api/v1',
    authToken: 'doodle-token',
  }),
}));

const messages: IMessage[] = [
  {
    _id: '1',
    author: 'Ninja',
    message: 'Great resource, thanks',
    createdAt: '2018-03-10T09:55:00.000Z',
  },
];

const newMessage: IMessage = {
  _id: '2',
  author: 'Maddie',
  message: 'Hello',
  createdAt: '2018-03-10T10:55:00.000Z',
};

const sendMessagePayload: SendMessagePayload = {
  author: 'Maddie',
  message: 'Hello',
};

describe('messagesApi', () => {
  beforeEach(() => {
    const successfulResponse = {
      ok: true,
      json: () => Promise.resolve(messages),
    } as Response;

    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockResolvedValue(successfulResponse);
  });

  it('fetches messages from the backend with the auth token', async () => {
    await expect(fetchMessages({ limit: 5 })).resolves.toEqual(messages);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/messages?limit=5',
      {
        headers: {
          Authorization: 'Bearer doodle-token',
        },
      }
    );
  });

  it('passes the abort signal to the backend request', async () => {
    const abortController = new AbortController();

    await expect(
      fetchMessages({ limit: 5 }, abortController.signal)
    ).resolves.toEqual(messages);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/messages?limit=5',
      {
        headers: {
          Authorization: 'Bearer doodle-token',
        },
        signal: abortController.signal,
      }
    );
  });

  it('fetches the next page of messages after a timestamp with a limit of 10', async () => {
    await expect(
      fetchMessages({ after: '2018-03-10T09:55:00.000Z', limit: 10 })
    ).resolves.toEqual(messages);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/messages?limit=10&after=2018-03-10T09%3A55%3A00.000Z',
      {
        headers: {
          Authorization: 'Bearer doodle-token',
        },
      }
    );
  });

  it('throws an error when the backend rejects the request', async () => {
    const failedResponse = {
      ok: false,
    } as Response;

    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockResolvedValue(failedResponse);

    await expect(fetchMessages({ limit: 10 })).rejects.toThrow(
      'Unable to fetch chat messages.'
    );
  });

  it('sends a message to the backend with the auth token', async () => {
    const successfulResponse = {
      ok: true,
      json: () => Promise.resolve(newMessage),
    } as Response;

    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockResolvedValue(successfulResponse);

    await expect(sendMessage(sendMessagePayload)).resolves.toEqual(newMessage);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer doodle-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendMessagePayload),
      }
    );
  });

  it('throws an error when sending a message fails', async () => {
    const failedResponse = {
      ok: false,
    } as Response;

    global.fetch = jest
      .fn<ReturnType<typeof fetch>, Parameters<typeof fetch>>()
      .mockResolvedValue(failedResponse);

    await expect(sendMessage(sendMessagePayload)).rejects.toThrow(
      'Unable to send chat message.'
    );
  });
});
