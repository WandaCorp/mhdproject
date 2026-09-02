import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PosterGrid } from "@/components/media/PosterGrid";
import type { ItemMedia } from "@/lib/tmdb/types";
import { useFavoritos } from "@/store/favoritos";

export const Route = createFileRoute("/favoritos")({
  component: FavoritosPage,
  head: () => ({ meta: [{ title: "Favoritos · SUR DB" }] }),
});

function FavoritosPage() {
  const items = useFavoritos((s) => s.items);
  const hidratado = useFavoritos((s) => s.hidratado);

  const media: ItemMedia[] = items.map((f) => ({
    id: f.id,
    tipo: f.tipo,
    titulo: f.titulo,
    poster: f.poster,
    backdrop: null,
    fecha: f.fecha,
    calificacion: f.calificacion,
  }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Tu lista
        </p>
        <h1 className="font-display text-4xl tracking-wide">Favoritos</h1>
        <p className="mt-1 text-sm text-muted">
          Guardados en este dispositivo. {hidratado ? `${items.length} títulos.` : ""}
        </p>
      </header>
      {hidratado && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Heart className="size-10 text-subtle" />
          <p className="text-sm text-muted">
            Todavía no marcaste películas ni series. Recorre el catálogo y toca
            el corazón en cualquier ficha.
          </p>
        </div>
      ) : (
        <PosterGrid items={media} cargando={!hidratado} />
      )}
    </div>
  );
}
