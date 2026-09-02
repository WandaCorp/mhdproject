import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as Star } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, n as Route } from "./router-B0ak4PzA.mjs";
import { l as formatearFecha, m as urlImagen, s as formatearCalificacion, t as DetalleSkeleton, u as formatearRuntime } from "./Skeletons-D9bSW7Ls.mjs";
import { c as obtenerTemporada, s as obtenerSerie } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/serie._id_.temporada._numero-CQZWBwCW.js
var import_jsx_runtime = require_jsx_runtime();
function TemporadaPage() {
	const { id, numero } = Route.useParams();
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const serie = useQuery({
		queryKey: ["serie", id],
		queryFn: () => obtenerSerie(Number(id))
	});
	const temporada = useQuery({
		queryKey: [
			"temporada",
			id,
			numero
		],
		queryFn: () => obtenerTemporada(Number(id), Number(numero))
	});
	if (temporada.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetalleSkeleton, {});
	if (temporada.isError || !temporada.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-20 text-center text-sm text-danger",
		children: "No se encontró esta temporada."
	});
	const t = temporada.data;
	const poster = urlImagen(t.poster_path, "poster", calidad);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/serie/$id",
				params: { id },
				className: "text-xs font-semibold uppercase tracking-widest text-accent",
				children: ["← ", serie.data?.name ?? "Serie"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-3 mb-8 flex gap-4",
				children: [poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					className: "h-40 w-28 rounded-[4px] object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-wide",
						children: t.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							t.episodes.length,
							" episodios",
							t.air_date ? ` · ${formatearFecha(t.air_date)}` : ""
						]
					}),
					t.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-fg/90",
						children: t.overview
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-4",
				children: t.episodes.map((ep) => {
					const still = urlImagen(ep.still_path, "still", calidad);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col overflow-hidden rounded-lg bg-bg-elevated sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video w-full shrink-0 bg-bg-subtle sm:aspect-auto sm:h-auto sm:w-56",
							children: still ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: still,
								alt: "",
								className: "size-full object-cover",
								loading: "lazy"
							}) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] uppercase tracking-wider text-ocean",
									children: ["Episodio ", ep.episode_number]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-medium",
									children: ep.name || `Episodio ${ep.episode_number}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex flex-wrap gap-2 text-xs text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatearFecha(ep.air_date) || "Sin fecha" }),
										ep.runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", formatearRuntime(ep.runtime)] }) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												"· ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-warn text-warn" }),
												formatearCalificacion(ep.vote_average)
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-fg/85",
									children: ep.overview || "Sin sinopsis."
								})
							]
						})]
					}, ep.id);
				})
			})
		]
	});
}
//#endregion
export { TemporadaPage as component };
