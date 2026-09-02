import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as cn } from "./router-B0ak4PzA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Skeletons-D9bSW7Ls.js
var import_jsx_runtime = require_jsx_runtime();
/** Extrae el año de una fecha ISO (YYYY-MM-DD). */
function anioDe(fecha) {
	if (!fecha) return "";
	return fecha.slice(0, 4);
}
/** Formato corto de fecha en español. */
function formatearFecha(fecha) {
	if (!fecha) return "";
	const [y, m, d] = fecha.split("-").map(Number);
	if (!y) return "";
	if (!m || !d) return String(y);
	try {
		return new Intl.DateTimeFormat("es-MX", {
			day: "numeric",
			month: "short",
			year: "numeric"
		}).format(new Date(y, m - 1, d));
	} catch {
		return fecha;
	}
}
function formatearCalificacion(valor) {
	if (valor === void 0 || valor === null || Number.isNaN(valor) || valor <= 0) return "—";
	return valor.toFixed(1);
}
function formatearRuntime(minutos) {
	if (!minutos || minutos <= 0) return "";
	const h = Math.floor(minutos / 60);
	const m = minutos % 60;
	if (h <= 0) return `${m} min`;
	if (m <= 0) return `${h} h`;
	return `${h} h ${m} min`;
}
function formatearDinero(valor) {
	if (!valor || valor <= 0) return "No disponible";
	return new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(valor);
}
function hoyISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function tituloDe(item) {
	return item.title || item.name || "Sin título";
}
function fechaDe(item) {
	return item.release_date || item.first_air_date || "";
}
function tipoDe(item, fallback = "movie") {
	if (item.media_type === "tv") return "tv";
	if (item.media_type === "movie") return "movie";
	if (item.media_type === "person") return "person";
	if (item.media_type === "collection") return "collection";
	if (item.title) return "movie";
	if (item.name && item.profile_path !== void 0 && !item.poster_path) return "person";
	return fallback;
}
function normalizarItem(item, fallback = "movie") {
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
		mediaTypeApi: item.media_type
	};
}
function etiquetaTipo(tipo) {
	switch (tipo) {
		case "tv": return "Serie";
		case "person": return "Persona";
		case "collection": return "Colección";
		default: return "Película";
	}
}
function genderLabel(gender) {
	if (gender === 1) return "Femenino";
	if (gender === 2) return "Masculino";
	if (gender === 3) return "No binario";
	return "No especificado";
}
var BASE = "https://image.tmdb.org/t/p";
var TAMANOS = {
	poster: {
		baja: "w185",
		media: "w342",
		alta: "w500"
	},
	backdrop: {
		baja: "w300",
		media: "w780",
		alta: "w1280"
	},
	profile: {
		baja: "w185",
		media: "w185",
		alta: "h632"
	},
	still: {
		baja: "w185",
		media: "w300",
		alta: "w500"
	},
	logo: {
		baja: "w92",
		media: "w154",
		alta: "w300"
	}
};
/** Construye la URL de imagen de TMDb según calidad configurada. */
function urlImagen(path, tipo, calidad = "media") {
	if (!path) return null;
	return `${BASE}/${TAMANOS[tipo][calidad]}${path}`;
}
function urlLogoProveedor(path) {
	return `${BASE}/w92${path}`;
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("skeleton-shimmer rounded-md", className),
		...props
	});
}
function PosterSkeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("poster-w shrink-0 aspect-[2/3] rounded-[4px]", className) });
}
function PosterRowSkeleton({ count = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "feed-scroll",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterSkeleton, {}, i))
	});
}
function HeroSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9] md:max-h-[78vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-full rounded-none" })
	});
}
function GridSkeleton({ count = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[2/3] w-full rounded-[4px]" }, i))
	});
}
function DetalleSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[42vh] w-full rounded-none md:h-[56vh]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mx-auto aspect-[2/3] w-44 shrink-0 rounded-[4px] md:mx-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full" })
			]
		})]
	})] });
}
//#endregion
export { anioDe as a, formatearDinero as c, genderLabel as d, hoyISO as f, urlLogoProveedor as h, PosterRowSkeleton as i, formatearFecha as l, urlImagen as m, GridSkeleton as n, etiquetaTipo as o, normalizarItem as p, HeroSkeleton as r, formatearCalificacion as s, DetalleSkeleton as t, formatearRuntime as u };
