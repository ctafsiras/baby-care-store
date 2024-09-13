"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/app/loading";

export function Providers({ children, ...props }: ThemeProviderProps) {
  let persistor = persistStore(store);
  return (
    <ThemeProvider {...props}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
