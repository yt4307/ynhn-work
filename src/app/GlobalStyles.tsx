"use client";

import { Global, css } from "@emotion/react";

/**
 * ynhn-work Global Design Tokens
 * - Font: Pretendard
 * - Type scale: base 14, minor scale (-2, +8) => 12 ~ 22 used as core ramp
 * - Spacing: 4px grid
 * - Breakpoints: 480 / 768 / 1024 / 1280 / 1536
 * - Colors:
 *   - neutral: 100 ~ 1300
 *   - brand: 100 ~ 1000 (Blue)
 *   - secondary: 100 ~ 1000 (Violet)
 *   - semantic: warning / error / success / info (100 ~ 1000)
 */

export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        /* ========== Breakpoints ========== */
        --bp-mobile: 480px;
        --bp-tablet: 768px;
        --bp-laptop: 1024px;
        --bp-desktop: 1280px;
        --bp-wide: 1536px;

        /* ========== Spacing (4px grid) ========== */
        --space-0: 0px;
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 20px;
        --space-6: 24px;
        --space-7: 28px;
        --space-8: 32px;
        --space-9: 36px;
        --space-10: 40px;
        --space-12: 48px;
        --space-14: 56px;
        --space-16: 64px;
        --space-20: 80px;
        --space-24: 96px;
        --space-32: 128px;

        /* ========== Typography ========== */
        --font-sans:
          Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Noto Sans KR", "Apple SD Gothic Neo", "Helvetica Neue", Arial,
          "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", sans-serif;

        /* Width (장평) */
        --font-stretch: 100%;

        /* Type scale: base 14, minor scale (-2, +8) => 12..22 */
        --fs-12: 12px;
        --fs-14: 14px;
        --fs-16: 16px;
        --fs-18: 18px;
        --fs-20: 20px;
        --fs-22: 22px;

        /* Line-height */
        --lh-heading: 1.2;
        --lh-subtitle: 1.4;
        --lh-body: 1.5;

        /* Letter-spacing (자간) */
        /* Heading: 0.5% => 0.005em, Subtitle: -0.5% => -0.005em, Body: -1.5% => -0.015em */
        --ls-heading: 0.005em;
        --ls-subtitle: -0.005em;
        --ls-body: -0.015em;

        /* ========== Color Palette ========== */
        /* Neutral 100-1300 (13-step) */
        --neutral-100: #ffffff;
        --neutral-200: #f8fafc;
        --neutral-300: #f1f5f9;
        --neutral-400: #e2e8f0;
        --neutral-500: #cbd5e1;
        --neutral-600: #94a3b8;
        --neutral-700: #64748b;
        --neutral-800: #475569;
        --neutral-900: #334155;
        --neutral-1000: #1f2937;
        --neutral-1100: #111827;
        --neutral-1200: #0b1220;
        --neutral-1300: #050a14;

        /* Brand (Blue) 100-1000 */
        --brand-100: #eef5ff;
        --brand-200: #dbeaff;
        --brand-300: #bdd9ff;
        --brand-400: #8dbbff;
        --brand-500: #5a97ff;
        --brand-600: #2f6bff; /* main */
        --brand-700: #2453db;
        --brand-800: #1f45b6;
        --brand-900: #1a388f;
        --brand-1000: #152b6b;

        /* Secondary (Violet) 100-1000 */
        --secondary-100: #f5f3ff;
        --secondary-200: #ede9fe;
        --secondary-300: #ddd6fe;
        --secondary-400: #c4b5fd;
        --secondary-500: #a78bfa;
        --secondary-600: #8b5cf6;
        --secondary-700: #7c3aed;
        --secondary-800: #6d28d9;
        --secondary-900: #5b21b6;
        --secondary-1000: #4c1d95;

        /* Semantic - Warning (Amber) 100-1000 */
        --warning-100: #fffbeb;
        --warning-200: #fef3c7;
        --warning-300: #fde68a;
        --warning-400: #fcd34d;
        --warning-500: #fbbf24;
        --warning-600: #f59e0b;
        --warning-700: #d97706;
        --warning-800: #b45309;
        --warning-900: #92400e;
        --warning-1000: #78350f;

        /* Semantic - Error (Red) 100-1000 */
        --error-100: #fef2f2;
        --error-200: #fee2e2;
        --error-300: #fecaca;
        --error-400: #fca5a5;
        --error-500: #f87171;
        --error-600: #ef4444;
        --error-700: #dc2626;
        --error-800: #b91c1c;
        --error-900: #991b1b;
        --error-1000: #7f1d1d;

        /* Semantic - Success (Green) 100-1000 */
        --success-100: #ecfdf5;
        --success-200: #d1fae5;
        --success-300: #a7f3d0;
        --success-400: #6ee7b7;
        --success-500: #34d399;
        --success-600: #10b981;
        --success-700: #059669;
        --success-800: #047857;
        --success-900: #065f46;
        --success-1000: #064e3b;

        /* Semantic - Info (Cyan) 100-1000 */
        --info-100: #ecfeff;
        --info-200: #cffafe;
        --info-300: #a5f3fc;
        --info-400: #67e8f9;
        --info-500: #22d3ee;
        --info-600: #06b6d4;
        --info-700: #0891b2;
        --info-800: #0e7490;
        --info-900: #155e75;
        --info-1000: #164e63;

        /* ========== Semantic Aliases (1/2/3-level hierarchy) ========== */
        /* 1) Background / Surface */
        --bg: var(--neutral-200);
        --surface-1: var(--neutral-100);
        --surface-2: var(--neutral-200);
        --surface-3: var(--neutral-300);

        /* 2) Text hierarchy */
        --text-1: var(--neutral-1200);
        --text-2: var(--neutral-900);
        --text-3: var(--neutral-700);
        --text-invert: var(--neutral-100);

        /* 3) Border / Divider */
        --border-1: var(--neutral-400);
        --border-2: var(--neutral-500);

        /* Focus ring / Accent (brand only on point) */
        --accent: var(--brand-600);
        --accent-hover: var(--brand-700);
        --focus-ring: rgba(47, 107, 255, 0.28);

        /* Radius */
        --radius-2: 8px;
        --radius-3: 12px;
        --radius-4: 16px;
        --radius-5: 20px;

        /* Shadow (subtle) */
        --shadow-1: 0 1px 2px rgba(5, 10, 20, 0.06);
        --shadow-2: 0 6px 20px rgba(5, 10, 20, 0.08);
      }

      /* ========== Reset-ish ========== */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }

      html {
        font-family: var(--font-sans);
        font-stretch: var(--font-stretch);
        -webkit-text-size-adjust: 100%;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text-1);
        font-size: var(--fs-14);
        line-height: var(--lh-body);
        letter-spacing: var(--ls-body);
      }

      /* Basic elements */
      a {
        color: inherit;
        text-decoration: none;
      }
      button,
      input,
      textarea,
      select {
        font: inherit;
        color: inherit;
      }

      /* Selection */
      ::selection {
        background: rgba(47, 107, 255, 0.18);
      }

      /* ========== Type Utilities (optional but handy) ========== */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        color: var(--text-1);
        letter-spacing: var(--ls-heading);
        line-height: var(--lh-heading);
        font-weight: 700;
      }

      h1 {
        font-size: var(--fs-22);
      }
      h2 {
        font-size: var(--fs-20);
      }
      h3 {
        font-size: var(--fs-18);
      }

      .subtitle {
        font-size: var(--fs-16);
        line-height: var(--lh-subtitle);
        letter-spacing: var(--ls-subtitle);
        color: var(--text-2);
      }

      .body {
        font-size: var(--fs-14);
        line-height: var(--lh-body);
        letter-spacing: var(--ls-body);
        color: var(--text-2);
      }

      .caption {
        font-size: var(--fs-12);
        line-height: var(--lh-subtitle);
        letter-spacing: var(--ls-body);
        color: var(--text-3);
      }

      /* ========== Focus ========== */
      :focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
        border-radius: var(--radius-2);
      }

      /* ========== Responsive base tweaks (optional) ========== */
      @media (min-width: 768px) {
        body {
          font-size: var(--fs-16);
        }
      }
    `}
  />
);

export default GlobalStyles;
