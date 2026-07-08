import { appActions } from './rootReducer';
import { createAppStore } from './store';

describe('store', () => {
  it('starts with the expected root state', () => {
    const testStore = createAppStore();

    expect(testStore.getState()).toEqual({
      app: {
        initialized: true,
      },
    });
  });

  it('dispatches reducer actions through the configured store', () => {
    const testStore = createAppStore();

    testStore.dispatch(appActions.setInitialized(false));

    expect(testStore.getState().app.initialized).toBe(false);
  });
});
