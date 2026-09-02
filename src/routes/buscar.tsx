import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PosterGrid } from "@/components/media/PosterGrid";
import { Input } from "@/components/ui/input";
import { useInfiniteSentinel } from "@/hooks/useInfiniteSentinel";
import { buscar } from "@/lib/tmdb/api";
import type { TipoBusqueda } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";
import { useConfiguracion } from "@/store/configuracion";

const FILTROS: { id: TipoBusqueda; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "pelicula", label: "Películas" },
  { id: "serie", label: "Series" },
  { id: "persona", label: "Personas" },
];

type BuscarSearch = { q?: string; tipo?: TipoBusqueda };

export const Route = createFileRoute("/buscar")({
  validateSearch: (s: Record<string, unknown>): BuscarSearch => ({
    q: typeof s.q === "string" ? s.q : "",
    tipo:
      s.tipo === "pelicula" || s.tipo === "serie" || s.tipo === "persona"
        ? s.tipo
        : "todos",
  }),
  component: BuscarPage,
  head: () => ({ meta: [{ title: "Buscar · SUR DB" }] }),
});

function BuscarPage() {
  const { q = "", tipo = "todos" } = Route.useSearch();
  const navigate = useNavigate({ from: "/buscar" });
  const [texto, setTexto] = useState(q);
  const adulto = useConfiguracion((s) => s.contenidoAdulto);

  useEffect(() => setTexto(q), [q]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (texto === q) return;
      navigate({
        search: { q: texto, tipo },
        replace: true,
      });
    }, 350);
    return () => window.clearTimeout(t);
  }, [texto, q, tipo, navigate]);

  const query = useInfiniteQuery({
    queryKey: ["buscar", q, tipo, adulto],
    enabled: q.trim().length > 0,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => buscar(q, tipo, pageParam, adulto),
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });

  const items = useMemo(
    () => query.data?.pages.flatMap((p) => p.results) ?? [],
    [query.data],
  );

  const sentinel = useInfiniteSentinel(
    () => {
      if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
    },
    Boolean(query.hasNextPage),
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
      <header className="mb-6">
        <h1 className="font-display text-4xl tracking-wide">Buscar</h1>
        <form
          className="relative mt-4 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: texto, tipo } });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Películas, series o personas"
            className="pl-9"
            aria-label="Término de búsqueda"
          />
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => navigate({ search: { q: texto, tipo: f.id } })}
              className={cn(
                "h-9 rounded-full px-4 text-sm",
                tipo === f.id
                  ? "bg-accent text-accent-fg"
                  : "bg-bg-subtle text-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        {adulto ? (
          <p className="mt-3 rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-xs text-warn">
            Contenido +18 activo: esta búsqueda puede incluir material adulto.
          </p>
        ) : null}
      </header>

      {!q.trim() ? (
        <p className="py-16 text-center text-sm text-muted">
          Escribe un título, una serie o el nombre de una persona.
        </p>
      ) : query.isError ? (
        <p className="py-16 text-center text-sm text-danger">
          No se pudo completar la búsqueda. Inténtalo de nuevo.
        </p>
      ) : (
        <>
          <PosterGrid
            items={items}
            cargando={query.isLoading}
            mostrarTitulo={tipo === "persona" || tipo === "todos"}
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
