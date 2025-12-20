"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";

import type { SceneSpec } from "./types";

type Segment = {
  start: number;
  end: number;
  lengthPx: number;
};

export default function ScrollStory({
  scenes,
  snap = true,
}: {
  scenes: SceneSpec[];
  snap?: boolean;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(1);

  const rafRef = useRef<number | null>(null);
  const snappingRef = useRef(false);
  const lastSnapAtRef = useRef(0);

  // prefers-reduced-motion
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = !!mql?.matches;

    const onChange = () => {
      prefersReducedMotionRef.current = !!mql?.matches;
    };

    mql?.addEventListener?.("change", onChange);
    return () => mql?.removeEventListener?.("change", onChange);
  }, []);

  // scroll / resize tracking
  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
      setVh(window.innerHeight || 1);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // scene → pixel segments
  const segments: Segment[] = useMemo(() => {
    return scenes.reduce<Segment[]>((acc, scene) => {
      const prevEnd = acc.length > 0 ? acc[acc.length - 1].end : 0;
      const lengthPx = Math.max(1, scene.lengthVh * vh);
      acc.push({ start: prevEnd, end: prevEnd + lengthPx, lengthPx });
      return acc;
    }, []);
  }, [scenes, vh]);

  const totalVh = useMemo(
    () => scenes.reduce((sum, s) => sum + s.lengthVh, 0),
    [scenes]
  );

  /**
   * snap points (global Y positions)
   */
  const snapPoints = useMemo(() => {
    const pts: number[] = [];

    scenes.forEach((scene, i) => {
      const seg = segments[i];
      if (!seg) return;

      const stops = scene.snapStops?.length ? scene.snapStops : [0, 1];

      for (const s of stops) {
        const stop = clamp01(s);
        pts.push(seg.start + stop * seg.lengthPx);
      }
    });

    pts.sort((a, b) => a - b);

    // dedupe (near values)
    const deduped: number[] = [];
    for (const y of pts) {
      if (deduped.length === 0) {
        deduped.push(y);
        continue;
      }
      const prev = deduped[deduped.length - 1];
      if (Math.abs(prev - y) > 2) deduped.push(y);
    }

    return deduped;
  }, [scenes, segments]);

  /**
   * Wheel / trackpad snap behavior
   */
  useEffect(() => {
    if (!snap) return;

    const SNAP_COOLDOWN_MS = 700;
    const DELTA_THRESHOLD = 18;

    const onWheel: EventListener = (event) => {
      const e = event as WheelEvent;

      if (e.ctrlKey) return;

      const now = Date.now();
      if (snappingRef.current) return;
      if (now - lastSnapAtRef.current < SNAP_COOLDOWN_MS) return;

      const dy = e.deltaY;
      if (Math.abs(dy) < DELTA_THRESHOLD) return;

      e.preventDefault();

      const current = window.scrollY || window.pageYOffset || 0;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;

      const target = findNextSnapPoint(snapPoints, current, dir);
      if (target == null) return;

      snappingRef.current = true;
      lastSnapAtRef.current = now;

      window.scrollTo({
        top: target,
        behavior: prefersReducedMotionRef.current ? "auto" : "smooth",
      });

      // unlock snapping after scroll settles
      const startAt = Date.now();
      const unlock = () => {
        const y = window.scrollY || window.pageYOffset || 0;
        if (Math.abs(y - target) < 2) {
          snappingRef.current = false;
          return;
        }
        if (Date.now() - startAt > 1200) {
          snappingRef.current = false;
          return;
        }
        requestAnimationFrame(unlock);
      };
      requestAnimationFrame(unlock);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [snap, snapPoints]);

  return (
    <Root style={{ height: `${Math.max(1, totalVh) * 100}vh` }}>
      {scenes.map((scene, idx) => {
        const seg = segments[idx];
        const progress = seg
          ? clamp01((scrollY - seg.start) / seg.lengthPx)
          : 0;
        const isActive = seg
          ? scrollY >= seg.start && scrollY < seg.end
          : false;

        return (
          <StickyFrame key={scene.id ?? idx} data-active={isActive}>
            {React.cloneElement(scene.element, { progress })}
          </StickyFrame>
        );
      })}
    </Root>
  );
}

/* =========================
   Styles (below JSX)
========================= */

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const StickyFrame = styled.section`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;

  display: grid;
  place-items: center;

  background: var(--bg);

  z-index: 0;
  &[data-active="true"] {
    z-index: 10;
  }

  pointer-events: none;
  &[data-active="true"] {
    pointer-events: auto;
  }
`;

/* =========================
   Helpers
========================= */

function clamp01(v: number) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function findNextSnapPoint(points: number[], current: number, dir: 1 | -1) {
  if (points.length === 0) return null;

  const EPS = 2;

  if (dir === 1) {
    for (const p of points) {
      if (p > current + EPS) return p;
    }
    return points[points.length - 1];
  } else {
    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      if (p < current - EPS) return p;
    }
    return points[0];
  }
}
