import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { PosterCard } from "@/components/media/PosterCard";
import { DetalleSkeleton } from "@/components/media/Skeletons";
import { obtenerPersona } from "@/lib/tmdb/api";
import {
  formatearFecha,
  genderLabel,
  normalizarItem,
} from "@/lib/tmdb/format";
import { urlImagen } from "@/lib/tmdb/images";
import type { ItemListaTmdb, ItemMedia } from "@/lib/tmdb/types";
import { useConfiguracion } from "@/store/configuracion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/persona/$id")({
  component: PersonaPage,
  head: () => ({ meta: [{ title: "Persona · SUR DB" }] }),
});

function dedupe(items: ItemListaTmdb[], fallback: ItemMedia["tipo"]): ItemMedia[] {
  const seen = new Set<string>();
  const out: ItemMedia[] = [];
  const ordenados = [...items].sort(
    (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  );
  for (const it of ordenados) {
    const tipo = it.media_type === "tv" ? "tv" : "movie";
    const key = `${tipo}-${it.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalizarItem(it, fallback === "tv" ? "tv" : tipo));
  }
  return out;
}

function PersonaPage() {
  const { id } = Route.useParams();
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const [tab, setTab] = useState<"cast" | "crew">("cast");
  const query = useQuery({
    queryKey: ["persona", id],
    queryFn: () => obtenerPersona(Number(id)),
  });

  const cast = useMemo(
    () => dedupe(query.data?.combined_credits?.cast ?? [], "movie"),
    [query.data],
  );
  const crew = useMemo(
    () => dedupe(query.data?.combined_credits?.crew ?? [], "movie"),
    [query.data],
  );

  if (query.isLoading) return <DetalleSkeleton />;
  if (query.isError || !query.data) {
    return (
      <p className="px-4 py-20 text-center text-sm text-danger">
        No se encontró esta persona.
      </p>
    );
  }

  const p = query.data;
  const foto = urlImagen(p.profile_path, "profile", "alta");
  const ext = p.external_ids;
  const lista = tab === "cast" ? cast : crew;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="mx-auto w-48 shrink-0 overflow-hidden rounded-[4px] bg-bg-subtle md:mx-0">
          {foto ? (
            <img src={foto} alt={p.name} className="w-full" />
          ) : (
            <div className="aspect-[2/3]" />
          )}
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {p.known_for_department || "Persona"}
          </p>
          <h1 className="font-display text-4xl tracking-wide md:text-5xl">
            {p.name}
          </h1>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            {p.birthday ? (
              <div>
                <dt className="text-muted">Nacimiento</dt>
                <dd>
                  {formatearFecha(p.birthday)}
                  {p.place_of_birth ? ` · ${p.place_of_birth}` : ""}
                </dd>
              </div>
            ) : null}
            {p.deathday ? (
              <div>
                <dt className="text-muted">Fallecimiento</dt>
                <dd>{formatearFecha(p.deathday)}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-muted">Género</dt>
              <dd>{genderLabel(p.gender)}</dd>
            </div>
          </dl>
          {p.also_known_as.length > 0 ? (
            <p className="text-xs text-muted">
              También conocido como: {p.also_known_as.slice(0, 6).join(" · ")}
            </p>
          ) : null}
          <p className="max-w-3xl text-sm leading-relaxed text-fg/90">
            {p.biography || "Sin biografía en español."}
          </p>
          <div className="flex flex-wrap gap-2">
            {p.homepage ? (
              <a
                href={p.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm"
              >
                Página oficial <ExternalLink className="size-3.5" />
              </a>
            ) : null}
            {ext?.imdb_id ? (
              <a
                href={`https://www.imdb.com/name/${ext.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm"
              >
                IMDb <ExternalLink className="size-3.5" />
              </a>
            ) : null}
            {ext?.instagram_id ? (
              <a
                href={`https://instagram.com/${ext.instagram_id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm"
              >
                Instagram
              </a>
            ) : null}
            <a
              href={`https://www.themoviedb.org/person/${p.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm"
            >
              TMDb <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex gap-2">
          {(
            [
              ["cast", `Interpretación (${cast.length})`],
              ["crew", `Equipo (${crew.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "h-9 rounded-full px-4 text-sm",
                tab === id ? "bg-accent text-accent-fg" : "bg-bg-subtle text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {lista.slice(0, 60).map((item) => (
            <PosterCard
              key={`${item.tipo}-${item.id}`}
              item={item}
              className="w-full"
              mostrarTitulo
            />
          ))}
        </div>
      </section>
    </div>
  );
}
