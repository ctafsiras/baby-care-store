import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { userSlice } from "./slice/user";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productApi } from "./api/product";
import { cartSlice } from "./slice/cart";
import { orderApi } from "./api/order";
import { userApi } from "./api/profile";
import { dashboardApi } from "./api/dashboard";
import { reviewApi } from "./api/review";
import { orderFeedbackApi } from "./api/orderFeedback";
const persistConfig = {
  key: "root-change",
  // timeout: 2000,
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [orderFeedbackApi.reducerPath]: orderFeedbackApi.reducer,
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(orderApi.middleware)
      .concat(productApi.middleware)
      .concat(userApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(reviewApi.middleware)
      .concat(orderFeedbackApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
