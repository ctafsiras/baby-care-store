import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface UserToken {
  token: string | null;
}

// Define the initial state using that type
const initialState: UserToken = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.token;

export default userSlice.reducer;
