/** Definición de secciones del feed y slugs del catálogo. */

export type SlugCategoria =
  | "episodios"
  | "estrenos-peliculas"
  | "estrenos-series"
  | "nuevas-peliculas"
  | "nuevas-series"
  | "nuevos-animes"
  | "nuevos-doramas"
  | "top-peliculas"
  | "top-series"
  | "colecciones";

export interface DefCategoria {
  slug: SlugCategoria;
  titulo: string;
  descripcion: string;
  tipo: "movie" | "tv" | "collection";
  esTop10?: boolean;
}

export const CATEGORIAS: DefCategoria[] = [
  {
    slug: "episodios",
    titulo: "Episodios",
    descripcion: "Series que emiten capítulo hoy",
    tipo: "tv",
  },
  {
    slug: "estrenos-peliculas",
    titulo: "Estrenos de Películas",
    descripcion: "Próximos estrenos en cines",
    tipo: "movie",
  },
  {
    slug: "estrenos-series",
    titulo: "Estrenos de Series",
    descripcion: "Series que están por estrenarse",
    tipo: "tv",
  },
  {
    slug: "nuevas-peliculas",
    titulo: "Nuevas Películas",
    descripcion: "En cartelera ahora",
    tipo: "movie",
  },
  {
    slug: "nuevas-series",
    titulo: "Nuevas Series",
    descripcion: "Series recientes al aire",
    tipo: "tv",
  },
  {
    slug: "nuevos-animes",
    titulo: "Nuevos Animes",
    descripcion: "Animación japonesa reciente",
    tipo: "tv",
  },
  {
    slug: "nuevos-doramas",
    titulo: "Nuevos Doramas",
    descripcion: "Dramas de Asia reciente",
    tipo: "tv",
  },
  {
    slug: "top-peliculas",
    titulo: "Películas más populares",
    descripcion: "Top 10 del momento",
    tipo: "movie",
    esTop10: true,
  },
  {
    slug: "top-series",
    titulo: "Series más populares",
    descripcion: "Top 10 del momento",
    tipo: "tv",
    esTop10: true,
  },
  {
    slug: "colecciones",
    titulo: "Colecciones",
    descripcion: "Sagas y universos compartidos",
    tipo: "collection",
  },
];

export const CATEGORIAS_MAP = Object.fromEntries(
  CATEGORIAS.map((c) => [c.slug, c]),
) as Record<SlugCategoria, DefCategoria>;

/** Colecciones icónicas de TMDb para el carrusel y el catálogo. */
export const COLECCIONES_IDS = [
  10, 119, 1241, 86311, 9485, 528, 645, 87359, 263, 230, 328, 121938, 10194,
  1570, 2344, 84, 295, 556, 86066, 2806, 173710, 151, 748, 2980, 535313, 404609,
  131295, 531242, 94874, 87096, 8091, 135483, 264, 1960, 8650, 386382, 726871,
  131292, 529322, 453993,
];
