import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Heart } from "../_libs/lucide-react.mjs";
import { u as useFavoritos } from "./router-B0ak4PzA.mjs";
import { t as PosterGrid } from "./PosterGrid-Vmn6CHRL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-sIizGIg6.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritosPage() {
	const items = useFavoritos((s) => s.items);
	const hidratado = useFavoritos((s) => s.hidratado);
	const media = items.map((f) => ({
		id: f.id,
		tipo: f.tipo,
		titulo: f.titulo,
		poster: f.poster,
		backdrop: null,
		fecha: f.fecha,
		calificacion: f.calificacion
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Tu lista"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-wide",
					children: "Favoritos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: ["Guardados en este dispositivo. ", hidratado ? `${items.length} títulos.` : ""]
				})
			]
		}), hidratado && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center gap-3 py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-10 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Todavía no marcaste películas ni series. Recorre el catálogo y toca el corazón en cualquier ficha."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterGrid, {
			items: media,
			cargando: !hidratado
		})]
	});
}
//#endregion
export { FavoritosPage as component };
