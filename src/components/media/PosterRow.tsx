import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { DefCategoria } from "@/lib/tmdb/categorias";
import type { ItemMedia } from "@/lib/tmdb/types";
import { PosterCard } from "./PosterCard";
import { PosterRowSkeleton } from "./Skeletons";

interface PosterRowProps {
  categoria: DefCategoria;
  items: ItemMedia[];
  cargando?: boolean;
  error?: boolean;
}

export function PosterRow({ categoria, items, cargando, error }: PosterRowProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: "smooth" });
  };

  return (
    <section className="relative px-4 md:px-8">
      <header className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl tracking-wide text-fg md:text-3xl">
            {categoria.titulo}
          </h2>
          <p className="text-xs text-muted">{categoria.descripcion}</p>
        </div>
        <Link
          to="/catalogo/$categoria"
          params={{ categoria: categoria.slug }}
          className="text-xs font-semibold uppercase tracking-widest text-accent hover:opacity-80"
        >
          Ver todo
        </Link>
      </header>

      {error ? (
        <p className="py-8 text-sm text-muted">No se pudo cargar esta sección.</p>
      ) : cargando ? (
        <PosterRowSkeleton />
      ) : items.length === 0 ? (
        <p className="py-8 text-sm text-muted">Sin resultados por ahora.</p>
      ) : (
        <div className="group/row relative">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg-elevated/90 text-fg shadow md:group-hover/row:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div ref={scroller} className="feed-scroll">
            {items.map((item, i) => (
              <PosterCard
                key={`${item.tipo}-${item.id}`}
                item={item}
                ranking={categoria.esTop10 ? i + 1 : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 z-10 hidden size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg-elevated/90 text-fg shadow md:group-hover/row:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
