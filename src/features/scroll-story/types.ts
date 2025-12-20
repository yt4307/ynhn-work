import type React from "react";

export type SceneSpec = {
  id?: string;
  lengthVh: number;

  /**
   * Scene 컴포넌트는 progress(0~1)를 선택적으로 받습니다.
   */
  element: React.ReactElement<{ progress?: number }>;

  /**
   * 0~1 사이 progress 지점들을 스냅 포인트로 사용
   * 예: [0, 0.92, 1]
   */
  snapStops?: number[];
};
