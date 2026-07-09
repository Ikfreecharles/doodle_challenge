import { combineReducers } from '@reduxjs/toolkit';
import { messagesReducer } from './messages/messagesSlice';
import { activeUserReducer } from './activeUser/activeUserSlice';

export const rootReducer = combineReducers({
  messages: messagesReducer,
  activeUser: activeUserReducer,
});
