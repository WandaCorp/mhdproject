import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FichaMedia } from "@/components/detalle/FichaMedia";
import { DetalleSkeleton } from "@/components/media/Skeletons";
import { obtenerPelicula } from "@/lib/tmdb/api";

export const Route = createFileRoute("/pelicula/$id")({
  component: PeliculaPage,
  head: () => ({ meta: [{ title: "Película · SUR DB" }] }),
});

function PeliculaPage() {
  const { id } = Route.useParams();
  const query = useQuery({
    queryKey: ["pelicula", id],
    queryFn: () => obtenerPelicula(Number(id)),
  });

  if (query.isLoading) return <DetalleSkeleton />;
  if (query.isError || !query.data) {
    return (
      <p className="px-4 py-20 text-center text-sm text-danger">
        No se encontró esta película.
      </p>
    );
  }
  return <FichaMedia media={query.data} tipo="movie" />;
}
