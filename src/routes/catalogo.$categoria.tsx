import { createFileRoute, notFound } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PosterGrid } from "@/components/media/PosterGrid";
import { useInfiniteSentinel } from "@/hooks/useInfiniteSentinel";
import { obtenerCategoria } from "@/lib/tmdb/api";
import { CATEGORIAS_MAP, type SlugCategoria } from "@/lib/tmdb/categorias";
import { useConfiguracion } from "@/store/configuracion";

function esSlug(v: string): v is SlugCategoria {
  return v in CATEGORIAS_MAP;
}

export const Route = createFileRoute("/catalogo/$categoria")({
  component: CatalogoPage,
  head: ({ params }) => {
    const def = esSlug(params.categoria)
      ? CATEGORIAS_MAP[params.categoria]
      : null;
    return { meta: [{ title: `${def?.titulo ?? "Catálogo"} · SUR DB` }] };
  },
});

function CatalogoPage() {
  const { categoria } = Route.useParams();
  if (!esSlug(categoria)) throw notFound();
  const def = CATEGORIAS_MAP[categoria];
  const adulto = useConfiguracion((s) => s.contenidoAdulto);

  const query = useInfiniteQuery({
    queryKey: ["catalogo", categoria, adulto],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => obtenerCategoria(categoria, pageParam, adulto),
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });

  const items = useMemo(() => {
    const all = query.data?.pages.flatMap((p) => p.results) ?? [];
    if (def.esTop10) return all.slice(0, 10);
    return all;
  }, [query.data, def.esTop10]);

  const sentinel = useInfiniteSentinel(
    () => {
      if (def.esTop10) return;
      if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
    },
    Boolean(query.hasNextPage) && !def.esTop10,
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Catálogo
        </p>
        <h1 className="font-display text-4xl tracking-wide">{def.titulo}</h1>
        <p className="mt-1 text-sm text-muted">{def.descripcion}</p>
      </header>
      {query.isError ? (
        <p className="py-16 text-center text-sm text-danger">
          No se pudo cargar el catálogo.
        </p>
      ) : (
        <>
          <PosterGrid
            items={items}
            cargando={query.isLoading}
            top10={def.esTop10}
          />
          <div ref={sentinel} className="h-12" />
          {query.isFetchingNextPage ? (
            <p className="py-4 text-center text-xs text-muted">Cargando más…</p>
          ) : null}
        </>
      )}
    </div>
  );
}
