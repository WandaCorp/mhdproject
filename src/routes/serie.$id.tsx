import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FichaMedia } from "@/components/detalle/FichaMedia";
import { DetalleSkeleton } from "@/components/media/Skeletons";
import { obtenerSerie } from "@/lib/tmdb/api";

export const Route = createFileRoute("/serie/$id")({
  component: SeriePage,
  head: () => ({ meta: [{ title: "Serie · SUR DB" }] }),
});

function SeriePage() {
  const { id } = Route.useParams();
  const query = useQuery({
    queryKey: ["serie", id],
    queryFn: () => obtenerSerie(Number(id)),
  });

  if (query.isLoading) return <DetalleSkeleton />;
  if (query.isError || !query.data) {
    return (
      <p className="px-4 py-20 text-center text-sm text-danger">
        No se encontró esta serie.
      </p>
    );
  }
  return <FichaMedia media={query.data} tipo="tv" />;
}
