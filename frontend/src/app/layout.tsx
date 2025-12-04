import type { Metadata } from "next";
import { pretendard } from "./fonts";
import { Providers } from "./Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "ynhn-work",
  description: "ynhn-work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
