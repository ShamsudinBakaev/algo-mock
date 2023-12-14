import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    currentSessionUUID: null,
    messages: [],
  },
  reducers: {
    setSessionUUID(state, action) {
      state.currentSessionUUID = action.payload;
    },
    // addMessage(state, action) {
    //   state.messages.push(action.payload);
    // },
    addUserMessage(state, action) {
      const newItem = ['user', action.payload];
      state.messages.push(newItem);
      // return state.concat([newItem]);
    },
    addBotMessage(state, action) {
      const newItem = ['bot', action.payload];
      state.messages.push(newItem);
      // return state.concat([newItem]);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { setSessionUUID, addUserMessage, addBotMessage, clearMessages } =
  sessionSlice.actions;
export default sessionSlice.reducer;
