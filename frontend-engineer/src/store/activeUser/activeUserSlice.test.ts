import { RootState } from '../store';
import { activeUserReducer, activeUserSelectors } from './activeUserSlice';

describe('messagesSlice', () => {
  it('starts with the default state', () => {
    expect(activeUserReducer(undefined, { type: '' })).toEqual({
      activeUser: '',
    });
  });

  it('selects messages state from the root state', () => {
    const rootState: RootState = {
      activeUser: {
        activeUser: 'Maddie',
      },
      messages: {
        items: [],
        isLoading: false,
        isSending: false,
        error: null,
        hasNoNewMessages: true,
      },
    };

    expect(activeUserSelectors.selectActiveUser(rootState)).toEqual('Maddie');
  });
});
