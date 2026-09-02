/**
 * Funciones de consulta a TMDb agrupadas por dominio.
 */
import { CATEGORIAS_MAP, COLECCIONES_IDS, type SlugCategoria } from "./categorias";
import { tmdbFetch } from "./client";
import { hoyISO, normalizarItem } from "./format";
import type {
  DetalleColeccion,
  DetallePelicula,
  DetallePersona,
  DetalleSerie,
  DetalleTemporada,
  ItemListaTmdb,
  ItemMedia,
  PaginaCatalogo,
  PaginaTmdb,
} from "./types";

const APPEND_DETALLE =
  "credits,videos,external_ids,recommendations,watch/providers";

function filtrarAdulto(items: ItemMedia[], incluirAdulto: boolean): ItemMedia[] {
  if (incluirAdulto) return items;
  return items.filter((i) => !i.adult);
}

function paginaDe(
  data: PaginaTmdb<ItemListaTmdb>,
  fallback: ItemMedia["tipo"],
  incluirAdulto: boolean,
): PaginaCatalogo {
  return {
    page: data.page,
    total_pages: Math.min(data.total_pages || 1, 500),
    total_results: data.total_results,
    results: filtrarAdulto(
      (data.results || []).map((r) => normalizarItem(r, fallback)),
      incluirAdulto,
    ),
  };
}

export async function obtenerTrending(
  incluirAdulto: boolean,
): Promise<ItemMedia[]> {
  const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>("/trending/all/week", {
    include_adult: incluirAdulto,
  });
  return filtrarAdulto(
    (data.results || [])
      .filter((r) => r.media_type === "movie" || r.media_type === "tv")
      .map((r) => normalizarItem(r)),
    incluirAdulto,
  );
}

export async function obtenerCategoria(
  slug: SlugCategoria,
  page: number,
  incluirAdulto: boolean,
): Promise<PaginaCatalogo> {
  const def = CATEGORIAS_MAP[slug];
  const hoy = hoyISO();
  const extra = { include_adult: incluirAdulto, page };

  switch (slug) {
    case "episodios": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
        "/tv/airing_today",
        extra,
      );
      return paginaDe(data, "tv", incluirAdulto);
    }
    case "estrenos-peliculas": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
        "/movie/upcoming",
        extra,
      );
      return paginaDe(data, "movie", incluirAdulto);
    }
    case "estrenos-series": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>("/discover/tv", {
        ...extra,
        sort_by: "first_air_date.asc",
        "first_air_date.gte": hoy,
        include_null_first_air_dates: false,
        with_type: "2|4",
      });
      return paginaDe(data, "tv", incluirAdulto);
    }
    case "nuevas-peliculas": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
        "/movie/now_playing",
        extra,
      );
      return paginaDe(data, "movie", incluirAdulto);
    }
    case "nuevas-series": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>("/discover/tv", {
        ...extra,
        sort_by: "first_air_date.desc",
        "first_air_date.lte": hoy,
        include_null_first_air_dates: false,
      });
      return paginaDe(data, "tv", incluirAdulto);
    }
    case "nuevos-animes": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>("/discover/tv", {
        ...extra,
        with_genres: 16,
        with_origin_country: "JP",
        sort_by: "first_air_date.desc",
        "first_air_date.lte": hoy,
      });
      return paginaDe(data, "tv", incluirAdulto);
    }
    case "nuevos-doramas": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>("/discover/tv", {
        ...extra,
        with_origin_country: "KR|TW|CN",
        without_genres: 16,
        sort_by: "first_air_date.desc",
        "first_air_date.lte": hoy,
      });
      return paginaDe(data, "tv", incluirAdulto);
    }
    case "top-peliculas": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
        "/movie/popular",
        extra,
      );
      const pagina = paginaDe(data, "movie", incluirAdulto);
      if (page === 1) pagina.results = pagina.results.slice(0, 10);
      return pagina;
    }
    case "top-series": {
      const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
        "/tv/popular",
        extra,
      );
      const pagina = paginaDe(data, "tv", incluirAdulto);
      if (page === 1) pagina.results = pagina.results.slice(0, 10);
      return pagina;
    }
    case "colecciones": {
      const paginaSize = 12;
      const inicio = (page - 1) * paginaSize;
      const ids = COLECCIONES_IDS.slice(inicio, inicio + paginaSize);
      const partes = await Promise.allSettled(
        ids.map((id) => obtenerColeccion(id)),
      );
      const results: ItemMedia[] = [];
      for (const p of partes) {
        if (p.status !== "fulfilled") continue;
        const c = p.value;
        results.push({
          id: c.id,
          tipo: "collection",
          titulo: c.name,
          poster: c.poster_path,
          backdrop: c.backdrop_path,
          fecha: "",
          calificacion: 0,
        });
      }
      return {
        page,
        total_pages: Math.ceil(COLECCIONES_IDS.length / paginaSize),
        total_results: COLECCIONES_IDS.length,
        results,
      };
    }
    default:
      return { page: 1, total_pages: 1, total_results: 0, results: [] };
  }
}

export function limiteFeed(slug: SlugCategoria): number {
  return CATEGORIAS_MAP[slug].esTop10 ? 10 : 16;
}

export async function obtenerPelicula(id: number): Promise<DetallePelicula> {
  return tmdbFetch<DetallePelicula>(`/movie/${id}`, {
    append_to_response: APPEND_DETALLE,
  });
}

export async function obtenerSerie(id: number): Promise<DetalleSerie> {
  return tmdbFetch<DetalleSerie>(`/tv/${id}`, {
    append_to_response: APPEND_DETALLE,
  });
}

export async function obtenerTemporada(
  serieId: number,
  numero: number,
): Promise<DetalleTemporada> {
  return tmdbFetch<DetalleTemporada>(`/tv/${serieId}/season/${numero}`);
}

export async function obtenerPersona(id: number): Promise<DetallePersona> {
  return tmdbFetch<DetallePersona>(`/person/${id}`, {
    append_to_response: "combined_credits,external_ids",
  });
}

export async function obtenerColeccion(id: number): Promise<DetalleColeccion> {
  return tmdbFetch<DetalleColeccion>(`/collection/${id}`);
}

export async function buscar(
  query: string,
  tipo: "todos" | "pelicula" | "serie" | "persona",
  page: number,
  incluirAdulto: boolean,
): Promise<PaginaCatalogo> {
  if (!query.trim()) {
    return { page: 1, total_pages: 1, total_results: 0, results: [] };
  }
  const params = {
    query: query.trim(),
    page,
    include_adult: incluirAdulto,
  };

  if (tipo === "pelicula") {
    const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
      "/search/movie",
      params,
    );
    return paginaDe(data, "movie", incluirAdulto);
  }
  if (tipo === "serie") {
    const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
      "/search/tv",
      params,
    );
    return paginaDe(data, "tv", incluirAdulto);
  }
  if (tipo === "persona") {
    const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
      "/search/person",
      params,
    );
    return paginaDe(data, "person", incluirAdulto);
  }

  const data = await tmdbFetch<PaginaTmdb<ItemListaTmdb>>(
    "/search/multi",
    params,
  );
  const filtrados = (data.results || []).filter(
    (r) =>
      r.media_type === "movie" ||
      r.media_type === "tv" ||
      r.media_type === "person",
  );
  return {
    page: data.page,
    total_pages: Math.min(data.total_pages || 1, 500),
    total_results: data.total_results,
    results: filtrarAdulto(
      filtrados.map((r) =>
        normalizarItem(r, r.media_type === "tv" ? "tv" : "movie"),
      ),
      incluirAdulto,
    ),
  };
}

export function trailerYoutube(
  videos?: { results: { key: string; site: string; type: string }[] },
): string | null {
  const lista = videos?.results ?? [];
  const yt = lista.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser") ??
    yt[0];
  return trailer?.key ?? null;
}
