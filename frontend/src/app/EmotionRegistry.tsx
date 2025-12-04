"use client";

import { PropsWithChildren, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

function createEmotionCache() {
  const cache = createCache({ key: "css", prepend: true });
  // next + emotion 호환 모드
  cache.compat = true;
  return cache;
}

export function EmotionRegistry({ children }: PropsWithChildren) {
  const [cache] = useState(() => createEmotionCache());

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;

    const styles = names.map((name) => cache.inserted[name]).join(" ");

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
