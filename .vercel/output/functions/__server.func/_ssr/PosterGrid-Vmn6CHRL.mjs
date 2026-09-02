import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as GridSkeleton } from "./Skeletons-D9bSW7Ls.mjs";
import { n as PosterCard } from "./PosterCard-pUnDXXev.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PosterGrid-Vmn6CHRL.js
var import_jsx_runtime = require_jsx_runtime();
function PosterGrid({ items, cargando, top10, mostrarTitulo = false }) {
	if (cargando && items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridSkeleton, {});
	if (!cargando && items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-16 text-center text-sm text-muted",
		children: "No hay títulos para mostrar."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
			item,
			ranking: top10 ? i + 1 : void 0,
			className: "poster-w w-full",
			mostrarTitulo
		}, `${item.tipo}-${item.id}`))
	});
}
//#endregion
export { PosterGrid as t };
