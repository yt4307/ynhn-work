"use client";

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { queryClient } from "@/lib/react-query";
import { theme } from "@/styles/theme";
import { EmotionRegistry } from "./EmotionRegistry";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <EmotionRegistry>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </EmotionRegistry>
    </QueryClientProvider>
  );
}
