import type { ItemListaTmdb, ItemMedia, TipoMedia } from "./types";

/** Extrae el año de una fecha ISO (YYYY-MM-DD). */
export function anioDe(fecha?: string | null): string {
  if (!fecha) return "";
  return fecha.slice(0, 4);
}

/** Formato corto de fecha en español. */
export function formatearFecha(fecha?: string | null): string {
  if (!fecha) return "";
  const partes = fecha.split("-").map(Number);
  const [y, m, d] = partes;
  if (!y) return "";
  if (!m || !d) return String(y);
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(y, m - 1, d));
  } catch {
    return fecha;
  }
}

export function formatearCalificacion(valor?: number | null): string {
  if (valor === undefined || valor === null || Number.isNaN(valor) || valor <= 0) {
    return "—";
  }
  return valor.toFixed(1);
}

export function formatearRuntime(minutos?: number | null): string {
  if (!minutos || minutos <= 0) return "";
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h <= 0) return `${m} min`;
  if (m <= 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function formatearDinero(valor?: number | null): string {
  if (!valor || valor <= 0) return "No disponible";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function tituloDe(item: ItemListaTmdb): string {
  return item.title || item.name || "Sin título";
}

export function fechaDe(item: ItemListaTmdb): string {
  return item.release_date || item.first_air_date || "";
}

export function tipoDe(item: ItemListaTmdb, fallback: TipoMedia = "movie"): TipoMedia {
  if (item.media_type === "tv") return "tv";
  if (item.media_type === "movie") return "movie";
  if (item.media_type === "person") return "person";
  if (item.media_type === "collection") return "collection";
  if (item.title) return "movie";
  if (item.name && item.profile_path !== undefined && !item.poster_path) return "person";
  return fallback;
}

export function normalizarItem(
  item: ItemListaTmdb,
  fallback: TipoMedia = "movie",
): ItemMedia {
  const tipo = tipoDe(item, fallback);
  return {
    id: item.id,
    tipo,
    titulo: tituloDe(item),
    poster: item.poster_path ?? item.profile_path ?? null,
    backdrop: item.backdrop_path ?? null,
    fecha: fechaDe(item),
    calificacion: item.vote_average ?? 0,
    overview: item.overview,
    adult: item.adult,
    mediaTypeApi: item.media_type,
  };
}

export function rutaDeItem(item: Pick<ItemMedia, "id" | "tipo">): string {
  switch (item.tipo) {
    case "tv":
      return `/serie/${item.id}`;
    case "person":
      return `/persona/${item.id}`;
    case "collection":
      return `/coleccion/${item.id}`;
    default:
      return `/pelicula/${item.id}`;
  }
}

export function etiquetaTipo(tipo: TipoMedia): string {
  switch (tipo) {
    case "tv":
      return "Serie";
    case "person":
      return "Persona";
    case "collection":
      return "Colección";
    default:
      return "Película";
  }
}

export function genderLabel(gender: number): string {
  if (gender === 1) return "Femenino";
  if (gender === 2) return "Masculino";
  if (gender === 3) return "No binario";
  return "No especificado";
}
