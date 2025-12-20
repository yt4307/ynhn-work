"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function HeroContextScene({
  progress = 0,
}: {
  progress?: number;
}) {
  const p = clamp01(progress);

  const heroT = easeOutCubic(remap01(p, 0.0, 0.65));
  const ctxT = easeOutCubic(remap01(p, 0.35, 1.0));
  const swapT = easeOutCubic(remap01(p, 0.45, 0.92));

  // viewport
  const [vp, setVp] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /**
   * 목업 비율: "22:9"를 세로가 긴 목업(= height:width = 22:9)로 가정
   * => width/height = 9/22
   * 만약 가로가 긴 22:9라면: 22/9 로 변경
   */
  const ratioTarget = 9 / 22; // width/height

  // 시작: 화면을 덮는 풀블리드(여유 포함)
  const startW = vp.w * 1.12;
  const startH = vp.h * 1.12;

  // 끝: 목업 카드 크기(데스크톱 기준)
  const endH = clamp(vp.h * 0.82, 520, 860);
  const endW = endH * ratioTarget;

  // progress에 따라 width/height 각각 변형 → 비율이 바뀜
  const cardW = lerp(startW, endW, heroT);
  const cardH = lerp(startH, endH, heroT);

  // 오른쪽 이동 + 약간 위로
  const cardShiftX = lerp(0, vp.w * 0.18, heroT);
  const cardShiftY = lerp(0, -vp.h * 0.06, heroT);

  const radius = lerp(0, 28, heroT);

  // PNG → GIF 교체
  const heroOpacity = 1 - swapT;
  const gifOpacity = swapT;

  // 캐러셀 쪽으로 수렴(필요하면 end 값 조정)
  const bgPosY = lerp(50, 18, heroT);

  // Hero 텍스트/힌트 페이드 아웃
  const textFade = 1 - clamp01((heroT - 0.12) / 0.38);
  const textOpacity = Math.pow(textFade, 1.6);
  const textBlur = lerp(0, 2, 1 - textFade);
  const textY = lerp(0, -3.5, heroT);

  const scrollOpacity = lerp(0.95, 0, clamp01(heroT / 0.32));

  // Context는 fade only
  const ctxOpacity = Math.pow(ctxT, 1.1);

  // 배경이 어두울 때도 문서 가독성 확보 (컨텍스트로 갈수록 흰 배경 강화)
  const washOpacity = lerp(0, 1, clamp01((p - 0.35) / 0.5));

  // ✅ 오버레이(Shade)는 컨텍스트로 넘어갈수록 자연스럽게 사라짐
  const shadeT = easeOutCubic(remap01(p, 0.25, 0.75));
  const shadeOpacity = lerp(1, 0, shadeT);

  return (
    <Stage aria-label="Hero + Context Scene">
      <Wash style={{ opacity: washOpacity }} aria-hidden="true" />

      {/* ✅ 비율이 변하는 카드 + PNG/GIF 교체 */}
      <Card
        aria-hidden="true"
        style={{
          width: `${cardW}px`,
          height: `${cardH}px`,
          borderRadius: `${radius}px`,
          transform: `translate(calc(-50% + ${cardShiftX}px), calc(-50% + ${cardShiftY}px))`,
        }}
      >
        <HeroImage
          style={{
            backgroundPosition: `50% ${bgPosY}%`,
            opacity: heroOpacity,
          }}
        />
        <GifImage
          src="/works/tuti/context.gif"
          alt=""
          draggable={false}
          style={{ opacity: gifOpacity }}
        />
      </Card>

      {/* ✅ 컨텍스트로 갈수록 오버레이 제거 */}
      <Shade style={{ opacity: shadeOpacity }} aria-hidden="true" />

      {/* Hero 텍스트 */}
      <Center
        style={{
          transform: `translate(-50%, calc(-50% + ${textY}vh))`,
          opacity: textOpacity,
          filter: `blur(${textBlur}px)`,
          pointerEvents: textOpacity < 0.05 ? "none" : "auto",
        }}
        aria-label="Portfolio title"
      >
        <Name>정연한</Name>
        <Role>Frontend Portfolio</Role>
        <Divider aria-hidden="true" />
        <Work>TuTi</Work>
      </Center>

      {/* Scroll hint */}
      <ScrollHint style={{ opacity: scrollOpacity }} aria-hidden="true">
        <ScrollText>Scroll</ScrollText>
        <Arrow>⌄</Arrow>
      </ScrollHint>

      {/* Context (fade only) */}
      <ContextLayer
        style={{
          opacity: ctxOpacity,
          pointerEvents: ctxOpacity < 0.1 ? "none" : "auto",
        }}
        aria-label="Context content"
      >
        <ContextInner>
          <ContextHeading>Context</ContextHeading>
          <ContextCopy>
            TuTi 프로젝트에서는
            <br />
            이미지와 텍스트가 자주 바뀌는 화면을
            <br />
            반복적으로 다뤄야 했습니다.
            <br />
            <br />
            화면마다 UI를 다르게 처리하다 보니,
            <br />
            같은 앱인데도 인상이 달라 보였습니다.
            <br />
            <br />
            특히 캐러셀 이미지에 따라
            <br />
            텍스트와 아이콘의 가독성이 쉽게 깨졌습니다.
          </ContextCopy>
        </ContextInner>
      </ContextLayer>
    </Stage>
  );
}

/* =========================
   Styles (below JSX)
========================= */

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
`;

const Wash = styled.div`
  position: absolute;
  inset: 0;
  background: var(--bg);
  pointer-events: none;
`;

const Card = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  overflow: hidden;
  background: var(--neutral-1300);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.42);

  will-change: width, height, transform, border-radius;
`;

const HeroImage = styled.div`
  position: absolute;
  inset: 0;

  background-image: url("/works/tuti/hero.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  will-change: opacity, background-position;
`;

const GifImage = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
  object-fit: cover;

  will-change: opacity;
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.22) 0%,
    rgba(0, 0, 0, 0.38) 100%
  );

  pointer-events: none;
  will-change: opacity;
`;

const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  will-change: transform, opacity, filter;

  z-index: 3;
  text-align: center;
  color: #ffffff;

  width: min(34rem, calc(100% - var(--space-12)));
`;

const Name = styled.h1`
  margin: 0;
  font-weight: 700;
  letter-spacing: var(--ls-heading);
  line-height: var(--lh-heading);
  color: #ffffff;

  font-size: 32px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
  @media (min-width: 1024px) {
    font-size: 56px;
  }
`;

const Role = styled.p`
  margin: var(--space-4) 0 0;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: var(--lh-subtitle);
  color: #ffffff;

  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const Divider = styled.div`
  width: 24px;
  height: 1px;
  margin: var(--space-8) auto var(--space-4);
  background: rgba(255, 255, 255, 0.4);
`;

const Work = styled.p`
  margin: 0;
  font-weight: 600;
  letter-spacing: var(--ls-subtitle);
  line-height: var(--lh-subtitle);
  color: rgba(255, 255, 255, 0.9);

  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: var(--space-10);
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);

  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`;

const ScrollText = styled.p`
  margin: 0;
  font-size: var(--fs-12);
  line-height: var(--lh-subtitle);
  letter-spacing: var(--ls-body);
`;

const Arrow = styled.div`
  font-size: 18px;
  line-height: 1;
`;

const ContextLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  display: grid;
  place-items: center;

  will-change: opacity;
`;

const ContextInner = styled.div`
  width: 100%;
  max-width: 960px;
  padding: var(--space-24) var(--space-6);

  display: flex;
  flex-direction: column;
  gap: var(--space-10);

  @media (min-width: 768px) {
    padding: var(--space-32) var(--space-10);
    gap: var(--space-12);
  }
`;

const ContextHeading = styled.h2`
  margin: 0;
  font-size: var(--fs-20);
  line-height: var(--lh-heading);
  letter-spacing: var(--ls-heading);
  font-weight: 700;
  color: var(--text-1);
`;

const ContextCopy = styled.p`
  margin: 0;
  font-size: var(--fs-16);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
  color: var(--text-2);

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

/* helpers */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function remap01(v: number, a: number, b: number) {
  return clamp01((v - a) / (b - a));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
