import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { anioDe, etiquetaTipo, formatearCalificacion } from "@/lib/tmdb/format";
import { urlImagen } from "@/lib/tmdb/images";
import type { ItemMedia } from "@/lib/tmdb/types";
import { useConfiguracion } from "@/store/configuracion";
import { cn } from "@/lib/utils";
import { HeroSkeleton } from "./Skeletons";
import { MediaLink } from "./MediaLink";

const INTERVALO = 6500;

export function HeroSlider({
  items,
  cargando,
}: {
  items: ItemMedia[];
  cargando?: boolean;
}) {
  const slides = items.filter((i) => i.backdrop).slice(0, 8);
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  const startX = useRef<number | null>(null);
  const calidad = useConfiguracion((s) => s.calidadImagen);

  const ir = useCallback(
    (dir: number) => {
      if (slides.length === 0) return;
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (pausado || slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => ir(1), INTERVALO);
    return () => window.clearInterval(id);
  }, [pausado, slides.length, ir]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 48) ir(dx < 0 ? 1 : -1);
  };

  if (cargando) return <HeroSkeleton />;
  if (slides.length === 0) return null;

  const actual = slides[index];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-roledescription="carrusel"
      aria-label="Destacados"
    >
      <div className="relative aspect-[16/10] max-h-[86vh] min-h-[280px] w-full md:aspect-[21/9]">
        {slides.map((slide, i) => {
          const img = urlImagen(slide.backdrop, "backdrop", calidad);
          return (
            <div
              key={`${slide.tipo}-${slide.id}`}
              className={cn(
                "hero-slide absolute inset-0 transition-opacity duration-500 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== index}
            >
              {img ? (
                <img
                  src={img}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : null}
            </div>
          );
        })}
        <div className="hero-overlay pointer-events-none absolute inset-0" />

        <MediaLink
          item={actual}
          className="absolute inset-0 z-10"
          aria-label={`Ver ficha de ${actual.titulo}`}
        >
          <span className="sr-only">{actual.titulo}</span>
        </MediaLink>

        <span className="absolute left-4 top-4 z-20 rounded-full bg-bg/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-fg backdrop-blur-sm md:left-8 md:top-6">
          {etiquetaTipo(actual.tipo)}
        </span>

        <div className="pointer-events-none absolute bottom-6 left-4 z-20 max-w-[min(90%,36rem)] md:bottom-10 md:left-8">
          <h1 className="font-display text-4xl leading-none tracking-wide text-fg md:text-6xl">
            {actual.titulo}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-fg md:text-base">
            <span className="tabular-nums">{anioDe(actual.fecha) || "—"}</span>
            <span aria-hidden="true">•</span>
            <Star className="size-3.5 fill-warn text-warn" />
            <span className="tabular-nums">
              {formatearCalificacion(actual.calificacion)}
            </span>
          </p>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => ir(-1)}
              className="absolute left-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/50 text-fg md:flex"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => ir(1)}
              className="absolute right-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/50 text-fg md:flex"
            >
              <ChevronRight className="size-6" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir al destacado ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-200",
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-fg/40",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
