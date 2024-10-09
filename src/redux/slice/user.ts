import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface UserToken {
  token: string | null;
  role: string | null;
  userId: string | null;
}

// Define the initial state using that type
const initialState: UserToken = {
  token: null,
  role: null,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.userId = null;
    },
    login: (
      state,
      action: PayloadAction<{ token: string; role: string; userId: string }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.user.token;
export const selectRole = (state: RootState) => state.user.role;
export const selectUserId = (state: RootState) => state.user.userId;
export default userSlice.reducer;
