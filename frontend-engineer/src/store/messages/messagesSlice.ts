import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, SendMessagePayload } from '../../types/types';
import { RootState } from '../store';

export type MessagesState = {
  items: IMessage[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  hasNoNewMessages: boolean;
};

const initialState: MessagesState = {
  items: [],
  isLoading: false,
  isSending: false,
  error: null,
  hasNoNewMessages: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesRequested: (state) => {
      state.isLoading = true;
      state.error = null;
      state.hasNoNewMessages = false;
    },
    fetchMessagesSucceeded: (state, action: PayloadAction<IMessage[]>) => {
      state.isLoading = false;
      state.error = null;

      if (action.payload.length === 0) {
        state.hasNoNewMessages = true;
        return;
      }

      state.items = [...state.items, ...action.payload];
      state.hasNoNewMessages = false;
    },
    fetchMessagesFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    sendMessageRequested: {
      reducer: (state) => {
        state.isSending = true;
        state.error = null;
      },
      prepare: (payload: SendMessagePayload) => ({ payload }),
    },
    sendMessageSucceeded: (state, action: PayloadAction<IMessage>) => {
      state.items = [...state.items, action.payload];
      state.isSending = false;
      state.error = null;
      state.hasNoNewMessages = false;
    },
    sendMessageFailed: (state, action: PayloadAction<string>) => {
      state.isSending = false;
      state.error = action.payload;
    },
  },
});

const selectMessages = (state: RootState) => state.messages.items;
const selectMessagesLoading = (state: RootState) => state.messages.isLoading;
const selectMessageSending = (state: RootState) => state.messages.isSending;
const selectMessagesError = (state: RootState) => state.messages.error;
const selectHasNoNewMessages = (state: RootState) =>
  state.messages.hasNoNewMessages;

export const messagesReducer = messagesSlice.reducer;
export const messagesActions = messagesSlice.actions;
export const messagesSelectors = {
  selectMessages,
  selectMessagesLoading,
  selectMessageSending,
  selectMessagesError,
  selectHasNoNewMessages,
};
