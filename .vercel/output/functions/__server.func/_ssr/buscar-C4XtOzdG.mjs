import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search } from "../_libs/lucide-react.mjs";
import { t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, d as Input, g as cn, l as Route$7 } from "./router-B0ak4PzA.mjs";
import { t as PosterGrid } from "./PosterGrid-Vmn6CHRL.mjs";
import { t as useInfiniteSentinel } from "./useInfiniteSentinel-Dn_lx4fK.mjs";
import { t as buscar } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-C4XtOzdG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTROS = [
	{
		id: "todos",
		label: "Todos"
	},
	{
		id: "pelicula",
		label: "Películas"
	},
	{
		id: "serie",
		label: "Series"
	},
	{
		id: "persona",
		label: "Personas"
	}
];
function BuscarPage() {
	const { q = "", tipo = "todos" } = Route$7.useSearch();
	const navigate = useNavigate({ from: "/buscar" });
	const [texto, setTexto] = (0, import_react.useState)(q);
	const adulto = useConfiguracion((s) => s.contenidoAdulto);
	(0, import_react.useEffect)(() => setTexto(q), [q]);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => {
			if (texto === q) return;
			navigate({
				search: {
					q: texto,
					tipo
				},
				replace: true
			});
		}, 350);
		return () => window.clearTimeout(t);
	}, [
		texto,
		q,
		tipo,
		navigate
	]);
	const query = useInfiniteQuery({
		queryKey: [
			"buscar",
			q,
			tipo,
			adulto
		],
		enabled: q.trim().length > 0,
		initialPageParam: 1,
		queryFn: ({ pageParam }) => buscar(q, tipo, pageParam, adulto),
		getNextPageParam: (last) => last.page < last.total_pages ? last.page + 1 : void 0
	});
	const items = (0, import_react.useMemo)(() => query.data?.pages.flatMap((p) => p.results) ?? [], [query.data]);
	const sentinel = useInfiniteSentinel(() => {
		if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
	}, Boolean(query.hasNextPage));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1400px] px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-wide",
					children: "Buscar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "relative mt-4 max-w-xl",
					onSubmit: (e) => {
						e.preventDefault();
						navigate({ search: {
							q: texto,
							tipo
						} });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: texto,
						onChange: (e) => setTexto(e.target.value),
						placeholder: "Películas, series o personas",
						className: "pl-9",
						"aria-label": "Término de búsqueda"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: FILTROS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({ search: {
							q: texto,
							tipo: f.id
						} }),
						className: cn("h-9 rounded-full px-4 text-sm", tipo === f.id ? "bg-accent text-accent-fg" : "bg-bg-subtle text-muted"),
						children: f.label
					}, f.id))
				}),
				adulto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-xs text-warn",
					children: "Contenido +18 activo: esta búsqueda puede incluir material adulto."
				}) : null
			]
		}), !q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-sm text-muted",
			children: "Escribe un título, una serie o el nombre de una persona."
		}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-sm text-danger",
			children: "No se pudo completar la búsqueda. Inténtalo de nuevo."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterGrid, {
				items,
				cargando: query.isLoading,
				mostrarTitulo: tipo === "persona" || tipo === "todos"
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
export { BuscarPage as component };
