import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PosterGrid } from "@/components/media/PosterGrid";
import { DetalleSkeleton } from "@/components/media/Skeletons";
import { obtenerColeccion } from "@/lib/tmdb/api";
import { normalizarItem } from "@/lib/tmdb/format";
import { urlImagen } from "@/lib/tmdb/images";
import { useConfiguracion } from "@/store/configuracion";

export const Route = createFileRoute("/coleccion/$id")({
  component: ColeccionPage,
  head: () => ({ meta: [{ title: "Colección · SUR DB" }] }),
});

function ColeccionPage() {
  const { id } = Route.useParams();
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const query = useQuery({
    queryKey: ["coleccion", id],
    queryFn: () => obtenerColeccion(Number(id)),
  });

  if (query.isLoading) return <DetalleSkeleton />;
  if (query.isError || !query.data) {
    return (
      <p className="px-4 py-20 text-center text-sm text-danger">
        No se encontró esta colección.
      </p>
    );
  }

  const c = query.data;
  const backdrop = urlImagen(c.backdrop_path, "backdrop", calidad);
  const parts = [...c.parts]
    .sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""))
    .map((p) => normalizarItem(p, "movie"));

  return (
    <div>
      <div className="relative isolate min-h-[32vh] overflow-hidden">
        {backdrop ? (
          <img src={backdrop} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-bg-subtle" />
        )}
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[32vh] max-w-[1400px] items-end px-4 py-8 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Colección
            </p>
            <h1 className="font-display text-4xl tracking-wide md:text-6xl">{c.name}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        {c.overview ? (
          <p className="mb-8 max-w-3xl text-sm text-fg/90">{c.overview}</p>
        ) : null}
        <PosterGrid items={parts} />
      </div>
    </div>
  );
}
