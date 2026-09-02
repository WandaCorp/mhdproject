import type { ItemMedia } from "@/lib/tmdb/types";
import { PosterCard } from "./PosterCard";
import { GridSkeleton } from "./Skeletons";

export function PosterGrid({
  items,
  cargando,
  top10,
  mostrarTitulo = false,
}: {
  items: ItemMedia[];
  cargando?: boolean;
  top10?: boolean;
  mostrarTitulo?: boolean;
}) {
  if (cargando && items.length === 0) return <GridSkeleton />;
  if (!cargando && items.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted">
        No hay títulos para mostrar.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {items.map((item, i) => (
        <PosterCard
          key={`${item.tipo}-${item.id}`}
          item={item}
          ranking={top10 ? i + 1 : undefined}
          className="poster-w w-full"
          mostrarTitulo={mostrarTitulo}
        />
      ))}
    </div>
  );
}
