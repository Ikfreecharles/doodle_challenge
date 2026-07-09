import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ActiveUserState = {
  activeUser: string;
};

const initialState: ActiveUserState = {
  activeUser: '',
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    fetchActiveUser: (state) => {
      state.activeUser = 'Maddie'; //hardcode active user for quick iteration. For a more complex simulation, active user can be pulled from local storage but its unnecessary for this
    },
  },
});

const selectActiveUser = (state: RootState) => state.activeUser.activeUser;

export const activeUserReducer = activeUserSlice.reducer;
export const activeUserActions = activeUserSlice.actions;
export const activeUserSelectors = {
  selectActiveUser,
};
