import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, o as Route$4 } from "./router-B0ak4PzA.mjs";
import { m as urlImagen, p as normalizarItem, t as DetalleSkeleton } from "./Skeletons-D9bSW7Ls.mjs";
import { t as PosterGrid } from "./PosterGrid-Vmn6CHRL.mjs";
import { i as obtenerColeccion } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coleccion._id-TULBtYAg.js
var import_jsx_runtime = require_jsx_runtime();
function ColeccionPage() {
	const { id } = Route$4.useParams();
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const query = useQuery({
		queryKey: ["coleccion", id],
		queryFn: () => obtenerColeccion(Number(id))
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetalleSkeleton, {});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-20 text-center text-sm text-danger",
		children: "No se encontró esta colección."
	});
	const c = query.data;
	const backdrop = urlImagen(c.backdrop_path, "backdrop", calidad);
	const parts = [...c.parts].sort((a, b) => (a.release_date || "").localeCompare(b.release_date || "")).map((p) => normalizarItem(p, "movie"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative isolate min-h-[32vh] overflow-hidden",
		children: [
			backdrop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: backdrop,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto flex min-h-[32vh] max-w-[1400px] items-end px-4 py-8 md:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Colección"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-wide md:text-6xl",
					children: c.name
				})] })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-8 md:px-8",
		children: [c.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-8 max-w-3xl text-sm text-fg/90",
			children: c.overview
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterGrid, { items: parts })]
	})] });
}
//#endregion
export { ColeccionPage as component };
