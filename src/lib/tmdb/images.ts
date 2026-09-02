import type { CalidadImagen } from "./types";

const BASE = "https://image.tmdb.org/t/p";

const TAMANOS = {
  poster: { baja: "w185", media: "w342", alta: "w500" },
  backdrop: { baja: "w300", media: "w780", alta: "w1280" },
  profile: { baja: "w185", media: "w185", alta: "h632" },
  still: { baja: "w185", media: "w300", alta: "w500" },
  logo: { baja: "w92", media: "w154", alta: "w300" },
} as const;

export type TipoImagen = keyof typeof TAMANOS;

/** Construye la URL de imagen de TMDb según calidad configurada. */
export function urlImagen(
  path: string | null | undefined,
  tipo: TipoImagen,
  calidad: CalidadImagen = "media",
): string | null {
  if (!path) return null;
  return `${BASE}/${TAMANOS[tipo][calidad]}${path}`;
}

export function urlLogoProveedor(path: string): string {
  return `${BASE}/w92${path}`;
}
