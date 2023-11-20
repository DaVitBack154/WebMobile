import { createSlice } from '@reduxjs/toolkit';
import { RESET_STATE } from './actionDispatch';

const slice = createSlice({
  name: 'account',
  initialState: {
    profile: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.profile = action.payload;
    },
  },
});

const initialState = {
  profile: null,
};

const signoutreducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
export default slice.reducer;
export const { setAccount } = slice.actions;
export { signoutreducer };
