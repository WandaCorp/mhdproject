import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { DetalleSkeleton } from "@/components/media/Skeletons";
import { obtenerSerie, obtenerTemporada } from "@/lib/tmdb/api";
import {
  formatearCalificacion,
  formatearFecha,
  formatearRuntime,
} from "@/lib/tmdb/format";
import { urlImagen } from "@/lib/tmdb/images";
import { useConfiguracion } from "@/store/configuracion";

export const Route = createFileRoute("/serie/$id_/temporada/$numero")({
  component: TemporadaPage,
  head: () => ({ meta: [{ title: "Temporada · SUR DB" }] }),
});

function TemporadaPage() {
  const { id, numero } = Route.useParams();
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const serie = useQuery({
    queryKey: ["serie", id],
    queryFn: () => obtenerSerie(Number(id)),
  });
  const temporada = useQuery({
    queryKey: ["temporada", id, numero],
    queryFn: () => obtenerTemporada(Number(id), Number(numero)),
  });

  if (temporada.isLoading) return <DetalleSkeleton />;
  if (temporada.isError || !temporada.data) {
    return (
      <p className="px-4 py-20 text-center text-sm text-danger">
        No se encontró esta temporada.
      </p>
    );
  }

  const t = temporada.data;
  const poster = urlImagen(t.poster_path, "poster", calidad);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <Link
        to="/serie/$id"
        params={{ id }}
        className="text-xs font-semibold uppercase tracking-widest text-accent"
      >
        ← {serie.data?.name ?? "Serie"}
      </Link>
      <header className="mt-3 mb-8 flex gap-4">
        {poster ? (
          <img
            src={poster}
            alt=""
            className="h-40 w-28 rounded-[4px] object-cover"
          />
        ) : null}
        <div>
          <h1 className="font-display text-4xl tracking-wide">{t.name}</h1>
          <p className="text-sm text-muted">
            {t.episodes.length} episodios
            {t.air_date ? ` · ${formatearFecha(t.air_date)}` : ""}
          </p>
          {t.overview ? (
            <p className="mt-2 max-w-2xl text-sm text-fg/90">{t.overview}</p>
          ) : null}
        </div>
      </header>

      <ol className="space-y-4">
        {t.episodes.map((ep) => {
          const still = urlImagen(ep.still_path, "still", calidad);
          return (
            <li
              key={ep.id}
              className="flex flex-col overflow-hidden rounded-lg bg-bg-elevated sm:flex-row"
            >
              <div className="aspect-video w-full shrink-0 bg-bg-subtle sm:aspect-auto sm:h-auto sm:w-56">
                {still ? (
                  <img
                    src={still}
                    alt=""
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="flex-1 p-4">
                <p className="text-[11px] uppercase tracking-wider text-ocean">
                  Episodio {ep.episode_number}
                </p>
                <h2 className="font-medium">{ep.name || `Episodio ${ep.episode_number}`}</h2>
                <p className="mt-1 flex flex-wrap gap-2 text-xs text-muted">
                  <span>{formatearFecha(ep.air_date) || "Sin fecha"}</span>
                  {ep.runtime ? <span>· {formatearRuntime(ep.runtime)}</span> : null}
                  <span className="inline-flex items-center gap-1">
                    · <Star className="size-3 fill-warn text-warn" />
                    {formatearCalificacion(ep.vote_average)}
                  </span>
                </p>
                <p className="mt-2 text-sm text-fg/85">
                  {ep.overview || "Sin sinopsis."}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
