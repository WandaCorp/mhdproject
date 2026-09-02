/**
 * Cliente HTTP de TMDb v3.
 * La clave es la de prueba provista para SUR DB.
 */
const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = "692a43c4c264e6dd28bff9f69c0fa8eb";
export const IDIOMA = "es-MX";

export class TmdbError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "TmdbError";
    this.status = status;
  }
}

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  if (!("language" in params)) {
    url.searchParams.set("language", IDIOMA);
  }
  for (const [clave, valor] of Object.entries(params)) {
    if (valor === undefined || valor === "") continue;
    url.searchParams.set(clave, String(valor));
  }

  const respuesta = await fetch(url.toString());
  if (!respuesta.ok) {
    throw new TmdbError(
      `No se pudo consultar TMDb (${respuesta.status}).`,
      respuesta.status,
    );
  }
  return (await respuesta.json()) as T;
}
