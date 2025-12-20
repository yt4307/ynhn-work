import type { Metadata } from "next";
import EmotionRegistry from "@/lib/emotion/EmotionRegistry";
import GlobalStyles from "./GlobalStyles";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ynhn-work",
  description: "ynhn-work | 개인 포트폴리오 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 import */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          <Providers>{children}</Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}
