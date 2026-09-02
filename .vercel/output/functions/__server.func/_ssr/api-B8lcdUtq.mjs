import { h as COLECCIONES_IDS, m as CATEGORIAS_MAP } from "./router-B0ak4PzA.mjs";
import { f as hoyISO, p as normalizarItem } from "./Skeletons-D9bSW7Ls.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-B8lcdUtq.js
/**
* Cliente HTTP de TMDb v3.
* La clave es la de prueba provista para SUR DB.
*/
var API_BASE = "https://api.themoviedb.org/3";
var API_KEY = "692a43c4c264e6dd28bff9f69c0fa8eb";
var IDIOMA = "es-MX";
var TmdbError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "TmdbError";
		this.status = status;
	}
};
async function tmdbFetch(path, params = {}) {
	const url = new URL(`${API_BASE}${path}`);
	url.searchParams.set("api_key", API_KEY);
	if (!("language" in params)) url.searchParams.set("language", IDIOMA);
	for (const [clave, valor] of Object.entries(params)) {
		if (valor === void 0 || valor === "") continue;
		url.searchParams.set(clave, String(valor));
	}
	const respuesta = await fetch(url.toString());
	if (!respuesta.ok) throw new TmdbError(`No se pudo consultar TMDb (${respuesta.status}).`, respuesta.status);
	return await respuesta.json();
}
/**
* Funciones de consulta a TMDb agrupadas por dominio.
*/
var APPEND_DETALLE = "credits,videos,external_ids,recommendations,watch/providers";
function filtrarAdulto(items, incluirAdulto) {
	if (incluirAdulto) return items;
	return items.filter((i) => !i.adult);
}
function paginaDe(data, fallback, incluirAdulto) {
	return {
		page: data.page,
		total_pages: Math.min(data.total_pages || 1, 500),
		total_results: data.total_results,
		results: filtrarAdulto((data.results || []).map((r) => normalizarItem(r, fallback)), incluirAdulto)
	};
}
async function obtenerTrending(incluirAdulto) {
	return filtrarAdulto(((await tmdbFetch("/trending/all/week", { include_adult: incluirAdulto })).results || []).filter((r) => r.media_type === "movie" || r.media_type === "tv").map((r) => normalizarItem(r)), incluirAdulto);
}
async function obtenerCategoria(slug, page, incluirAdulto) {
	CATEGORIAS_MAP[slug];
	const hoy = hoyISO();
	const extra = {
		include_adult: incluirAdulto,
		page
	};
	switch (slug) {
		case "episodios": return paginaDe(await tmdbFetch("/tv/airing_today", extra), "tv", incluirAdulto);
		case "estrenos-peliculas": return paginaDe(await tmdbFetch("/movie/upcoming", extra), "movie", incluirAdulto);
		case "estrenos-series": return paginaDe(await tmdbFetch("/discover/tv", {
			...extra,
			sort_by: "first_air_date.asc",
			"first_air_date.gte": hoy,
			include_null_first_air_dates: false,
			with_type: "2|4"
		}), "tv", incluirAdulto);
		case "nuevas-peliculas": return paginaDe(await tmdbFetch("/movie/now_playing", extra), "movie", incluirAdulto);
		case "nuevas-series": return paginaDe(await tmdbFetch("/discover/tv", {
			...extra,
			sort_by: "first_air_date.desc",
			"first_air_date.lte": hoy,
			include_null_first_air_dates: false
		}), "tv", incluirAdulto);
		case "nuevos-animes": return paginaDe(await tmdbFetch("/discover/tv", {
			...extra,
			with_genres: 16,
			with_origin_country: "JP",
			sort_by: "first_air_date.desc",
			"first_air_date.lte": hoy
		}), "tv", incluirAdulto);
		case "nuevos-doramas": return paginaDe(await tmdbFetch("/discover/tv", {
			...extra,
			with_origin_country: "KR|TW|CN",
			without_genres: 16,
			sort_by: "first_air_date.desc",
			"first_air_date.lte": hoy
		}), "tv", incluirAdulto);
		case "top-peliculas": {
			const pagina = paginaDe(await tmdbFetch("/movie/popular", extra), "movie", incluirAdulto);
			if (page === 1) pagina.results = pagina.results.slice(0, 10);
			return pagina;
		}
		case "top-series": {
			const pagina = paginaDe(await tmdbFetch("/tv/popular", extra), "tv", incluirAdulto);
			if (page === 1) pagina.results = pagina.results.slice(0, 10);
			return pagina;
		}
		case "colecciones": {
			const paginaSize = 12;
			const inicio = (page - 1) * paginaSize;
			const ids = COLECCIONES_IDS.slice(inicio, inicio + paginaSize);
			const partes = await Promise.allSettled(ids.map((id) => obtenerColeccion(id)));
			const results = [];
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
					calificacion: 0
				});
			}
			return {
				page,
				total_pages: Math.ceil(COLECCIONES_IDS.length / paginaSize),
				total_results: COLECCIONES_IDS.length,
				results
			};
		}
		default: return {
			page: 1,
			total_pages: 1,
			total_results: 0,
			results: []
		};
	}
}
function limiteFeed(slug) {
	return CATEGORIAS_MAP[slug].esTop10 ? 10 : 16;
}
async function obtenerPelicula(id) {
	return tmdbFetch(`/movie/${id}`, { append_to_response: APPEND_DETALLE });
}
async function obtenerSerie(id) {
	return tmdbFetch(`/tv/${id}`, { append_to_response: APPEND_DETALLE });
}
async function obtenerTemporada(serieId, numero) {
	return tmdbFetch(`/tv/${serieId}/season/${numero}`);
}
async function obtenerPersona(id) {
	return tmdbFetch(`/person/${id}`, { append_to_response: "combined_credits,external_ids" });
}
async function obtenerColeccion(id) {
	return tmdbFetch(`/collection/${id}`);
}
async function buscar(query, tipo, page, incluirAdulto) {
	if (!query.trim()) return {
		page: 1,
		total_pages: 1,
		total_results: 0,
		results: []
	};
	const params = {
		query: query.trim(),
		page,
		include_adult: incluirAdulto
	};
	if (tipo === "pelicula") return paginaDe(await tmdbFetch("/search/movie", params), "movie", incluirAdulto);
	if (tipo === "serie") return paginaDe(await tmdbFetch("/search/tv", params), "tv", incluirAdulto);
	if (tipo === "persona") return paginaDe(await tmdbFetch("/search/person", params), "person", incluirAdulto);
	const data = await tmdbFetch("/search/multi", params);
	const filtrados = (data.results || []).filter((r) => r.media_type === "movie" || r.media_type === "tv" || r.media_type === "person");
	return {
		page: data.page,
		total_pages: Math.min(data.total_pages || 1, 500),
		total_results: data.total_results,
		results: filtrarAdulto(filtrados.map((r) => normalizarItem(r, r.media_type === "tv" ? "tv" : "movie")), incluirAdulto)
	};
}
function trailerYoutube(videos) {
	const yt = (videos?.results ?? []).filter((v) => v.site === "YouTube");
	return (yt.find((v) => v.type === "Trailer") ?? yt.find((v) => v.type === "Teaser") ?? yt[0])?.key ?? null;
}
//#endregion
export { obtenerPelicula as a, obtenerTemporada as c, obtenerColeccion as i, obtenerTrending as l, limiteFeed as n, obtenerPersona as o, obtenerCategoria as r, obtenerSerie as s, buscar as t, trailerYoutube as u };
