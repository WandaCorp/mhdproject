import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Play,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/media/FavoriteButton";
import { PosterCard } from "@/components/media/PosterCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { trailerYoutube } from "@/lib/tmdb/api";
import {
  anioDe,
  formatearCalificacion,
  formatearDinero,
  formatearFecha,
  formatearRuntime,
  normalizarItem,
} from "@/lib/tmdb/format";
import { urlImagen, urlLogoProveedor } from "@/lib/tmdb/images";
import type {
  DetallePelicula,
  DetalleSerie,
  ItemMedia,
  PersonaCredito,
  WatchRegion,
} from "@/lib/tmdb/types";
import { useConfiguracion } from "@/store/configuracion";
import { cn } from "@/lib/utils";

type Media = DetallePelicula | DetalleSerie;

function esPelicula(m: Media): m is DetallePelicula {
  return "title" in m;
}

function proveedoresDe(m: Media): WatchRegion | undefined {
  const map = m["watch/providers"]?.results;
  if (!map) return undefined;
  return map.MX || map.AR || map.ES || map.US || Object.values(map)[0];
}

function CastRow({ cast }: { cast: PersonaCredito[] }) {
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const lista = cast.slice(0, 16);
  if (lista.length === 0) return null;
  return (
    <section className="px-4 md:px-8">
      <h2 className="mb-3 font-display text-2xl tracking-wide">Reparto</h2>
      <div className="feed-scroll">
        {lista.map((p) => {
          const src = urlImagen(p.profile_path, "profile", calidad);
          return (
            <Link
              key={p.id}
              to="/persona/$id"
              params={{ id: String(p.id) }}
              className="w-[7.5rem] shrink-0 snap-start"
            >
              <div className="aspect-[2/3] overflow-hidden rounded-[4px] bg-bg-subtle">
                {src ? (
                  <img src={src} alt="" className="size-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex size-full items-end p-2 text-xs text-muted">
                    {p.name}
                  </div>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-fg">{p.name}</p>
              <p className="line-clamp-1 text-[11px] text-muted">{p.character}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function EnlacesExternos({
  homepage,
  imdb,
  tmdbPath,
}: {
  homepage?: string | null;
  imdb?: string | null;
  tmdbPath: string;
}) {
  const enlaces = [
    homepage ? { href: homepage, label: "Página oficial" } : null,
    imdb ? { href: `https://www.imdb.com/title/${imdb}`, label: "IMDb" } : null,
    { href: `https://www.themoviedb.org${tmdbPath}`, label: "TMDb" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <div className="flex flex-wrap gap-2">
      {enlaces.map((e) => (
        <a
          key={e.label}
          href={e.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-3 text-sm text-fg hover:border-accent"
        >
          {e.label}
          <ExternalLink className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

export function FichaMedia({ media, tipo }: { media: Media; tipo: "movie" | "tv" }) {
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const [trailerAbierto, setTrailerAbierto] = useState(false);
  const pelicula = esPelicula(media);
  const titulo = pelicula ? media.title : media.name;
  const original = pelicula ? media.original_title : media.original_name;
  const fecha = pelicula ? media.release_date : media.first_air_date;
  const poster = urlImagen(media.poster_path, "poster", calidad);
  const backdrop = urlImagen(media.backdrop_path, "backdrop", "alta");
  const key = trailerYoutube(media.videos);
  const director = media.credits?.crew.find((c) => c.job === "Director");
  const creadores = !pelicula ? media.created_by : [];
  const runtime = pelicula
    ? formatearRuntime(media.runtime)
    : formatearRuntime(media.episode_run_time?.[0]);
  const proveedores = proveedoresDe(media);
  const recs: ItemMedia[] = (media.recommendations?.results ?? [])
    .map((r) => normalizarItem(r, tipo))
    .slice(0, 14);

  const imdb = media.external_ids?.imdb_id || (pelicula ? media.imdb_id : null);

  const ficha = useMemo(() => {
    const filas: { k: string; v: string }[] = [
      { k: "Título original", v: original },
      { k: "Estado", v: media.status },
      { k: "Idioma original", v: pelicula ? "" : media.origin_country.join(", ") },
    ];
    if (pelicula) {
      filas.push(
        { k: "Presupuesto", v: formatearDinero(media.budget) },
        { k: "Recaudación", v: formatearDinero(media.revenue) },
      );
    } else {
      filas.push(
        { k: "Temporadas", v: String(media.number_of_seasons) },
        { k: "Episodios", v: String(media.number_of_episodes) },
        { k: "Tipo", v: media.type },
      );
    }
    filas.push({
      k: "Productoras",
      v: media.production_companies.map((c) => c.name).join(", ") || "—",
    });
    filas.push({
      k: "Países",
      v: media.production_countries.map((c) => c.name).join(", ") || "—",
    });
    return filas.filter((f) => f.v);
  }, [media, original, pelicula]);

  return (
    <article>
      <div className="relative isolate min-h-[42vh] overflow-hidden md:min-h-[56vh]">
        {backdrop ? (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-bg-subtle" />
        )}
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto -mt-36 max-w-6xl px-4 pb-16 md:-mt-44 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="mx-auto w-44 shrink-0 overflow-hidden rounded-[4px] shadow-xl md:mx-0 md:w-56">
            {poster ? (
              <img src={poster} alt={`Póster de ${titulo}`} className="w-full" />
            ) : (
              <div className="flex aspect-[2/3] items-end bg-bg-subtle p-3 font-display text-xl">
                {titulo}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <Badge variant="outline">{pelicula ? "Película" : "Serie"}</Badge>
            <h1 className="font-display text-4xl leading-none tracking-wide md:text-6xl">
              {titulo}
            </h1>
            {media.tagline ? (
              <p className="text-sm italic text-muted">{media.tagline}</p>
            ) : null}
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5 text-muted" />
                {formatearFecha(fecha) || anioDe(fecha) || "—"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="size-3.5 fill-warn text-warn" />
                <span className="tabular-nums">
                  {formatearCalificacion(media.vote_average)}
                </span>
                <span className="text-muted">
                  ({media.vote_count.toLocaleString("es-MX")})
                </span>
              </span>
              {runtime ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5 text-muted" />
                  {runtime}
                </span>
              ) : null}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {media.genres.map((g) => (
                <Badge key={g.id} variant="default">
                  {g.name}
                </Badge>
              ))}
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-fg/90">
              {media.overview || "Sin sinopsis disponible."}
            </p>
            {director ? (
              <p className="text-sm">
                <span className="text-muted">Dirección: </span>
                <Link
                  to="/persona/$id"
                  params={{ id: String(director.id) }}
                  className="text-accent hover:underline"
                >
                  {director.name}
                </Link>
              </p>
            ) : null}
            {creadores.length > 0 ? (
              <p className="text-sm">
                <span className="text-muted">Creación: </span>
                {creadores.map((c, i) => (
                  <span key={c.id}>
                    {i > 0 ? ", " : ""}
                    <Link
                      to="/persona/$id"
                      params={{ id: String(c.id) }}
                      className="text-accent hover:underline"
                    >
                      {c.name}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <FavoriteButton
                item={{
                  id: media.id,
                  tipo,
                  titulo,
                  poster: media.poster_path,
                  fecha,
                  calificacion: media.vote_average,
                }}
              />
              {key ? (
                <Button variant="ocean" onClick={() => setTrailerAbierto(true)}>
                  <Play className="size-4" />
                  Ver trailer
                </Button>
              ) : null}
            </div>

            <EnlacesExternos
              homepage={media.homepage}
              imdb={imdb}
              tmdbPath={pelicula ? `/movie/${media.id}` : `/tv/${media.id}`}
            />
          </div>
        </div>

        {proveedores &&
        (proveedores.flatrate || proveedores.rent || proveedores.buy) ? (
          <section className="mt-10">
            <h2 className="mb-3 inline-flex items-center gap-2 font-display text-2xl tracking-wide">
              <Globe className="size-5 text-ocean" />
              Dónde ver
            </h2>
            <div className="flex flex-wrap gap-3">
              {(proveedores.flatrate || proveedores.rent || proveedores.buy || [])
                .slice(0, 10)
                .map((p) => (
                  <div
                    key={p.provider_id}
                    className="flex items-center gap-2 rounded-md bg-bg-subtle px-2 py-1.5"
                  >
                    <img
                      src={urlLogoProveedor(p.logo_path)}
                      alt=""
                      className="size-8 rounded-[4px]"
                    />
                    <span className="text-xs">{p.provider_name}</span>
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl tracking-wide">Ficha técnica</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {ficha.map((f) => (
              <div key={f.k} className="rounded-lg bg-bg-elevated p-3">
                <dt className="text-[11px] uppercase tracking-wider text-muted">
                  {f.k}
                </dt>
                <dd className="mt-1 text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {!pelicula && media.seasons?.length ? (
          <section className="mt-10">
            <h2 className="mb-3 font-display text-2xl tracking-wide">Temporadas</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {media.seasons
                .filter((t) => t.season_number > 0)
                .map((t) => {
                  const src = urlImagen(t.poster_path, "poster", calidad);
                  return (
                    <Link
                      key={t.id}
                      to="/serie/$id/temporada/$numero"
                      params={{ id: String(media.id), numero: String(t.season_number) }}
                      className="flex gap-3 overflow-hidden rounded-lg bg-bg-elevated p-2 hover:ring-1 hover:ring-accent"
                    >
                      <div className="h-24 w-16 shrink-0 overflow-hidden rounded-[4px] bg-bg-subtle">
                        {src ? (
                          <img src={src} alt="" className="size-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted">
                          {t.episode_count} episodios
                          {t.air_date ? ` · ${anioDe(t.air_date)}` : ""}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-subtle">
                          {t.overview}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        ) : null}

        {pelicula && media.belongs_to_collection ? (
          <section className="mt-10">
            <h2 className="mb-3 font-display text-2xl tracking-wide">Colección</h2>
            <Link
              to="/coleccion/$id"
              params={{ id: String(media.belongs_to_collection.id) }}
              className="inline-flex items-center gap-3 rounded-lg bg-bg-elevated p-3 hover:ring-1 hover:ring-accent"
            >
              {media.belongs_to_collection.poster_path ? (
                <img
                  src={urlImagen(media.belongs_to_collection.poster_path, "poster", calidad) ?? ""}
                  alt=""
                  className="h-24 w-16 rounded-[4px] object-cover"
                />
              ) : null}
              <span>{media.belongs_to_collection.name}</span>
            </Link>
          </section>
        ) : null}
      </div>

      <div className="space-y-10 pb-16">
        <CastRow cast={media.credits?.cast ?? []} />
        {recs.length > 0 ? (
          <section className="px-4 md:px-8">
            <h2 className="mb-3 font-display text-2xl tracking-wide">
              Recomendados
            </h2>
            <div className="feed-scroll">
              {recs.map((item) => (
                <PosterCard key={`${item.tipo}-${item.id}`} item={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <Dialog open={trailerAbierto} onOpenChange={setTrailerAbierto}>
        <DialogContent className={cn("p-2 sm:p-3")}>
          <DialogTitle className="sr-only">Trailer de {titulo}</DialogTitle>
          {key ? (
            <div className="aspect-video overflow-hidden rounded-md bg-bg">
              <iframe
                title={`Trailer de ${titulo}`}
                src={`https://www.youtube.com/embed/${key}?autoplay=1`}
                className="size-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </article>
  );
}
