import { messagesActions } from './messages/messagesSlice';
import { createAppStore } from './store';

describe('store', () => {
  it('starts with the expected root state', () => {
    const testStore = createAppStore();

    expect(testStore.getState()).toEqual({
      activeUser: {
        activeUser: '',
      },
      messages: {
        items: [],
        isLoading: false,
        isSending: false,
        error: null,
        hasNoNewMessages: false,
      },
    });
  });

  it('dispatches reducer actions through the configured store', () => {
    const testStore = createAppStore();

    testStore.dispatch(messagesActions.fetchMessagesRequested());

    expect(testStore.getState().messages.isLoading).toBe(true);
  });
});
