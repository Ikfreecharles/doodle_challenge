import { combineReducers } from '@reduxjs/toolkit';
import { messagesReducer } from './messages/messagesSlice';
import { ActiveUserReducer } from './activeUser/activeUserSlice';

export const rootReducer = combineReducers({
  messages: messagesReducer,
  activeUser: ActiveUserReducer,
});
