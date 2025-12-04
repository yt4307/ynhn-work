export const theme = {
  font: {
    family: "Pretendard, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    size: {
      // base 14, minor scale -2, +8 기준
      body: 14,      // 기본
      bodySm: 12,    // -2
      subtitle: 16,  // +2 (보조 텍스트)
      h3: 18,        // +4
      h2: 22,        // +8
      h1: 26         // +12 (조금 더 강조)
    },
    lineHeight: {
      heading: 1.2,
      subtitle: 1.4,
      body: 1.5
    },
    letterSpacing: {
      heading: "0.005em",   // +0.5%
      subtitle: "-0.005em", // -0.5%
      body: "-0.015em"      // -1.5%
    }
  },

  // 4px 스페이싱 스케일
  space: (step: number) => `${step * 4}px`,

  breakpoint: {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536
  },

  color: {
    // neutral 100–1300 (밝은 → 어두운)
    neutral: {
      100: "#FFFFFF",
      200: "#F9FAFB",
      300: "#F3F4F6",
      400: "#E5E7EB",
      500: "#D1D5DB",
      600: "#9CA3AF",
      700: "#6B7280",
      800: "#4B5563",
      900: "#374151",
      1000: "#1F2933",
      1100: "#111827",
      1200: "#0B0F16",
      1300: "#05070B"
    },
    // brand: 레드 계열 (1,2,3단계 위계에서 포인트에만 사용)
    brand: {
      100: "#FFF5F5",
      200: "#FFE4E6",
      300: "#FFCDD2",
      400: "#EF9A9A",
      500: "#E57373",
      600: "#EF5350",
      700: "#E53935", // 기본 포인트
      800: "#D32F2F",
      900: "#C62828",
      1000: "#B71C1C"
    },
    // secondary: 살짝 차가운 그레이/블루 톤
    secondary: {
      100: "#F5F7FF",
      200: "#E4E9FF",
      300: "#CBD5FF",
      400: "#A3B5FF",
      500: "#7C94FF",
      600: "#5C75F2",
      700: "#435BD7",
      800: "#3246AD",
      900: "#263682",
      1000: "#1B275C"
    },
    // 상태 색상
    success: "#22C55E",
    warning: "#FACC15",
    error: "#EF4444",
    info: "#3B82F6"
  }
} as const;
