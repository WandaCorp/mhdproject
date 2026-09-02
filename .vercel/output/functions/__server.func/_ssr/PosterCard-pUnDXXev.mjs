import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useConfiguracion, g as cn } from "./router-B0ak4PzA.mjs";
import { a as anioDe, m as urlImagen, o as etiquetaTipo } from "./Skeletons-D9bSW7Ls.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PosterCard-pUnDXXev.js
var import_jsx_runtime = require_jsx_runtime();
/** Enlace tipado hacia la ficha según el tipo de medio. */
function MediaLink({ item, className, children, ...rest }) {
	switch (item.tipo) {
		case "tv": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/serie/$id",
			params: { id: String(item.id) },
			className,
			...rest,
			children
		});
		case "person": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/persona/$id",
			params: { id: String(item.id) },
			className,
			...rest,
			children
		});
		case "collection": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/coleccion/$id",
			params: { id: String(item.id) },
			className,
			...rest,
			children
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pelicula/$id",
			params: { id: String(item.id) },
			className,
			...rest,
			children
		});
	}
}
/** Póster del feed: solo imagen, etiqueta de fecha u ranking. */
function PosterCard({ item, ranking, className, mostrarTitulo = false }) {
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const src = urlImagen(item.poster, item.tipo === "person" ? "profile" : "poster", calidad);
	const anio = anioDe(item.fecha);
	const esTop = typeof ranking === "number";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MediaLink, {
		item,
		className: cn("poster-w group relative block shrink-0 snap-start", className),
		"aria-label": `${item.titulo}${anio ? ` (${anio})` : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "relative overflow-hidden rounded-[4px] bg-bg-subtle aspect-[2/3]",
			children: [
				src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					loading: "lazy",
					className: "size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-end bg-bg-subtle p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg leading-none text-muted",
						children: item.titulo
					})
				}),
				esTop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-1.5 top-1.5 rounded-[4px] bg-rank px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-rank-fg",
					children: ["#", ranking]
				}) : anio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-1.5 top-1.5 rounded-[4px] bg-ocean px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-ocean-fg",
					children: anio
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 rounded-[4px] ring-0 ring-accent/0 transition-[box-shadow] duration-200 group-hover:ring-2 group-hover:ring-accent" })
			]
		}), mostrarTitulo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1.5 line-clamp-2 text-xs text-muted",
			children: [item.titulo, item.tipo !== "movie" && item.tipo !== "tv" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[10px] uppercase tracking-wide text-subtle",
				children: etiquetaTipo(item.tipo)
			}) : null]
		}) : null]
	});
}
//#endregion
export { PosterCard as n, MediaLink as t };
