"use client";

import ScrollStory from "@/features/scroll-story/ScrollStory";
import HeroContextScene from "@/features/cases/tuti/scenes/HeroContextScene";

export default function ClientCasePage() {
  return (
    <ScrollStory
      snap
      scenes={[
        {
          id: "hero-context",
          lengthVh: 3.2,
          element: <HeroContextScene />,
          snapStops: [0, 0.92, 1], // ✅ 시작 → 교체완료 → 씬끝
        },
        // 다음 Scene들도 snapStops를 넣을 수 있음
      ]}
    />
  );
}
