import { anioDe, etiquetaTipo } from "@/lib/tmdb/format";
import { urlImagen } from "@/lib/tmdb/images";
import type { ItemMedia } from "@/lib/tmdb/types";
import { useConfiguracion } from "@/store/configuracion";
import { cn } from "@/lib/utils";
import { MediaLink } from "./MediaLink";

interface PosterCardProps {
  item: ItemMedia;
  ranking?: number;
  className?: string;
  mostrarTitulo?: boolean;
}

/** Póster del feed: solo imagen, etiqueta de fecha u ranking. */
export function PosterCard({
  item,
  ranking,
  className,
  mostrarTitulo = false,
}: PosterCardProps) {
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const src = urlImagen(
    item.poster,
    item.tipo === "person" ? "profile" : "poster",
    calidad,
  );
  const anio = anioDe(item.fecha);
  const esTop = typeof ranking === "number";

  return (
    <MediaLink
      item={item}
      className={cn(
        "poster-w group relative block shrink-0 snap-start",
        className,
      )}
      aria-label={`${item.titulo}${anio ? ` (${anio})` : ""}`}
    >
      <article className="relative overflow-hidden rounded-[4px] bg-bg-subtle aspect-[2/3]">
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full items-end bg-bg-subtle p-2">
            <span className="font-display text-lg leading-none text-muted">
              {item.titulo}
            </span>
          </div>
        )}

        {esTop ? (
          <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-rank px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-rank-fg">
            #{ranking}
          </span>
        ) : anio ? (
          <span className="absolute right-1.5 top-1.5 rounded-[4px] bg-ocean px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-ocean-fg">
            {anio}
          </span>
        ) : null}

        <span className="pointer-events-none absolute inset-0 rounded-[4px] ring-0 ring-accent/0 transition-[box-shadow] duration-200 group-hover:ring-2 group-hover:ring-accent" />
      </article>
      {mostrarTitulo ? (
        <p className="mt-1.5 line-clamp-2 text-xs text-muted">
          {item.titulo}
          {item.tipo !== "movie" && item.tipo !== "tv" ? (
            <span className="block text-[10px] uppercase tracking-wide text-subtle">
              {etiquetaTipo(item.tipo)}
            </span>
          ) : null}
        </p>
      ) : null}
    </MediaLink>
  );
}
