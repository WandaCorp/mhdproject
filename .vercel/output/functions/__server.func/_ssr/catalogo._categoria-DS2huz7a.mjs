import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, c as esSlug, m as CATEGORIAS_MAP, s as Route$5 } from "./router-B0ak4PzA.mjs";
import { t as PosterGrid } from "./PosterGrid-Vmn6CHRL.mjs";
import { t as useInfiniteSentinel } from "./useInfiniteSentinel-Dn_lx4fK.mjs";
import { r as obtenerCategoria } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo._categoria-DS2huz7a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CatalogoPage() {
	const { categoria } = Route$5.useParams();
	if (!esSlug(categoria)) throw notFound();
	const def = CATEGORIAS_MAP[categoria];
	const adulto = useConfiguracion((s) => s.contenidoAdulto);
	const query = useInfiniteQuery({
		queryKey: [
			"catalogo",
			categoria,
			adulto
		],
		initialPageParam: 1,
		queryFn: ({ pageParam }) => obtenerCategoria(categoria, pageParam, adulto),
		getNextPageParam: (last) => last.page < last.total_pages ? last.page + 1 : void 0
	});
	const items = (0, import_react.useMemo)(() => {
		const all = query.data?.pages.flatMap((p) => p.results) ?? [];
		if (def.esTop10) return all.slice(0, 10);
		return all;
	}, [query.data, def.esTop10]);
	const sentinel = useInfiniteSentinel(() => {
		if (def.esTop10) return;
		if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
	}, Boolean(query.hasNextPage) && !def.esTop10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: "Catálogo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-wide",
					children: def.titulo
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: def.descripcion
				})
			]
		}), query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-sm text-danger",
			children: "No se pudo cargar el catálogo."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterGrid, {
				items,
				cargando: query.isLoading,
				top10: def.esTop10
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: sentinel,
				className: "h-12"
			}),
			query.isFetchingNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-4 text-center text-xs text-muted",
				children: "Cargando más…"
			}) : null
		] })]
	});
}
//#endregion
export { CatalogoPage as component };
