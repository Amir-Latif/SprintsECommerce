import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    registerStart(state, action) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.user = action.payload;
    },
    registerError(state, action) {
      state.error = action.payload;
    },
    loginStart(state, action) {
      state.loading = action.payload;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
    },
    loginError(state, action) {
      state.error = action.payload;
    },
    logoutStart(state, action) {
      state.loading = action.payload;
    },
    logoutSuccess(state, action) {
      state.user = null;
    },
    logoutError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});



//action creator handle singing in

export const {
  registerError,
  registerStart,
  registerSuccess,
  loginError,
  loginStart,
  loginSuccess,
  logoutError,
  logoutStart,
  logoutSuccess,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
