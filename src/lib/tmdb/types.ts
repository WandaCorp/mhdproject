/** Tipos de la API de TMDb y modelos normalizados de SUR DB. */

export type TipoMedia = "movie" | "tv" | "person" | "collection";
export type TipoBusqueda = "todos" | "pelicula" | "serie" | "persona";
export type CalidadImagen = "baja" | "media" | "alta";
export type TamanoPoster = "pequeno" | "mediano" | "grande";

export interface PaginaTmdb<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ItemListaTmdb {
  id: number;
  adult?: boolean;
  backdrop_path: string | null;
  poster_path?: string | null;
  profile_path?: string | null;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  media_type?: string;
  original_language?: string;
  genre_ids?: number[];
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
  known_for_department?: string;
  character?: string;
  job?: string;
  department?: string;
}

export interface Genero {
  id: number;
  name: string;
}

export interface Compania {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country?: string;
}

export interface Pais {
  iso_3166_1: string;
  name: string;
}

export interface Idioma {
  iso_639_1: string;
  english_name?: string;
  name: string;
}

export interface PersonaCredito {
  id: number;
  name: string;
  character?: string;
  job?: string;
  department?: string;
  profile_path: string | null;
  known_for_department?: string;
}

export interface VideoTmdb {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
}

export interface IdsExternos {
  imdb_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
  wikidata_id?: string | null;
}

export interface ProveedorWatch {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface WatchRegion {
  link?: string;
  flatrate?: ProveedorWatch[];
  rent?: ProveedorWatch[];
  buy?: ProveedorWatch[];
}

export interface ColeccionResumen {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TemporadaResumen {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  vote_average?: number;
}

export interface Episodio {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date: string | null;
  episode_number: number;
  season_number: number;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
}

export interface DetallePelicula {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  status: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  genres: Genero[];
  production_companies: Compania[];
  production_countries: Pais[];
  spoken_languages: Idioma[];
  belongs_to_collection: ColeccionResumen | null;
  credits?: { cast: PersonaCredito[]; crew: PersonaCredito[] };
  videos?: { results: VideoTmdb[] };
  external_ids?: IdsExternos;
  recommendations?: PaginaTmdb<ItemListaTmdb>;
  "watch/providers"?: { results: Record<string, WatchRegion> };
}

export interface DetalleSerie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  name: string;
  original_name: string;
  tagline: string;
  overview: string;
  first_air_date: string;
  last_air_date: string | null;
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons: number;
  number_of_episodes: number;
  homepage: string | null;
  in_production: boolean;
  genres: Genero[];
  created_by: PersonaCredito[];
  networks: Compania[];
  production_companies: Compania[];
  production_countries: Pais[];
  spoken_languages: Idioma[];
  seasons: TemporadaResumen[];
  last_episode_to_air: Episodio | null;
  next_episode_to_air: Episodio | null;
  episode_run_time: number[];
  origin_country: string[];
  credits?: { cast: PersonaCredito[]; crew: PersonaCredito[] };
  videos?: { results: VideoTmdb[] };
  external_ids?: IdsExternos;
  recommendations?: PaginaTmdb<ItemListaTmdb>;
  "watch/providers"?: { results: Record<string, WatchRegion> };
}

export interface DetalleTemporada {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  air_date: string | null;
  episodes: Episodio[];
}

export interface DetallePersona {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  homepage: string | null;
  also_known_as: string[];
  popularity: number;
  adult: boolean;
  combined_credits?: {
    cast: ItemListaTmdb[];
    crew: ItemListaTmdb[];
  };
  external_ids?: IdsExternos;
}

export interface DetalleColeccion {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: ItemListaTmdb[];
}

/** Ítem unificado para tarjetas del catálogo y el feed. */
export interface ItemMedia {
  id: number;
  tipo: TipoMedia;
  titulo: string;
  poster: string | null;
  backdrop: string | null;
  fecha: string;
  calificacion: number;
  overview?: string;
  adult?: boolean;
  mediaTypeApi?: string;
}

export interface PaginaCatalogo {
  page: number;
  total_pages: number;
  total_results: number;
  results: ItemMedia[];
}
