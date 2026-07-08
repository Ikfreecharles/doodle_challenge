import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  initialized: boolean;
};

const initialAppState: AppState = {
  initialized: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const rootReducer = combineReducers({
  app: appSlice.reducer,
});

export const appActions = appSlice.actions;
