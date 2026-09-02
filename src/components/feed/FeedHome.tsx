import { useQuery } from "@tanstack/react-query";
import { HeroSlider } from "@/components/media/HeroSlider";
import { PosterRow } from "@/components/media/PosterRow";
import { CATEGORIAS } from "@/lib/tmdb/categorias";
import { limiteFeed, obtenerCategoria, obtenerTrending } from "@/lib/tmdb/api";
import { useConfiguracion } from "@/store/configuracion";

function SeccionFeed({
  slug,
  visible,
  adulto,
}: {
  slug: (typeof CATEGORIAS)[number]["slug"];
  visible: boolean;
  adulto: boolean;
}) {
  const cat = CATEGORIAS.find((c) => c.slug === slug)!;
  const query = useQuery({
    queryKey: ["feed", slug, adulto],
    queryFn: () => obtenerCategoria(slug, 1, adulto),
    enabled: visible,
  });
  if (!visible) return null;
  const items = (query.data?.results ?? []).slice(0, limiteFeed(slug));
  return (
    <PosterRow
      categoria={cat}
      items={items}
      cargando={query.isLoading}
      error={query.isError}
    />
  );
}

export function FeedHome() {
  const adulto = useConfiguracion((s) => s.contenidoAdulto);
  const secciones = useConfiguracion((s) => s.secciones);
  const trending = useQuery({
    queryKey: ["trending", adulto],
    queryFn: () => obtenerTrending(adulto),
  });

  return (
    <div className="flex flex-col gap-10 pb-16">
      <HeroSlider items={trending.data ?? []} cargando={trending.isLoading} />
      {CATEGORIAS.map((cat) => (
        <SeccionFeed
          key={cat.slug}
          slug={cat.slug}
          visible={secciones[cat.slug] !== false}
          adulto={adulto}
        />
      ))}
    </div>
  );
}
