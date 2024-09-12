"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
