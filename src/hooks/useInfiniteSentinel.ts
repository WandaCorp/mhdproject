import { useEffect, useRef } from "react";

/** Observa un nodo sentinela para infinite scroll. */
export function useInfiniteSentinel(
  onIntersect: () => void,
  enabled: boolean,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect();
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [onIntersect, enabled]);

  return ref;
}
