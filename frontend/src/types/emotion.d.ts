import "@emotion/react";

type AppTheme = typeof import("../styles/theme")["theme"];

declare module "@emotion/react" {
  // Emotion의 Theme 인터페이스를 우리가 만든 theme로 확장
  export type Theme = AppTheme
}
