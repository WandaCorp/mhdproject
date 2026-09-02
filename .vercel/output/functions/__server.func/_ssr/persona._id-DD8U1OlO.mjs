import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, g as cn, i as Route$2 } from "./router-B0ak4PzA.mjs";
import { d as genderLabel, l as formatearFecha, m as urlImagen, p as normalizarItem, t as DetalleSkeleton } from "./Skeletons-D9bSW7Ls.mjs";
import { n as PosterCard } from "./PosterCard-pUnDXXev.mjs";
import { o as obtenerPersona } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/persona._id-DD8U1OlO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function dedupe(items, fallback) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	const ordenados = [...items].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
	for (const it of ordenados) {
		const tipo = it.media_type === "tv" ? "tv" : "movie";
		const key = `${tipo}-${it.id}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(normalizarItem(it, fallback === "tv" ? "tv" : tipo));
	}
	return out;
}
function PersonaPage() {
	const { id } = Route$2.useParams();
	useConfiguracion((s) => s.calidadImagen);
	const [tab, setTab] = (0, import_react.useState)("cast");
	const query = useQuery({
		queryKey: ["persona", id],
		queryFn: () => obtenerPersona(Number(id))
	});
	const cast = (0, import_react.useMemo)(() => dedupe(query.data?.combined_credits?.cast ?? [], "movie"), [query.data]);
	const crew = (0, import_react.useMemo)(() => dedupe(query.data?.combined_credits?.crew ?? [], "movie"), [query.data]);
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetalleSkeleton, {});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-20 text-center text-sm text-danger",
		children: "No se encontró esta persona."
	});
	const p = query.data;
	const foto = urlImagen(p.profile_path, "profile", "alta");
	const ext = p.external_ids;
	const lista = tab === "cast" ? cast : crew;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-48 shrink-0 overflow-hidden rounded-[4px] bg-bg-subtle md:mx-0",
				children: foto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: foto,
					alt: p.name,
					className: "w-full"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[2/3]" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-accent",
						children: p.known_for_department || "Persona"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-wide md:text-5xl",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-2 text-sm sm:grid-cols-2",
						children: [
							p.birthday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Nacimiento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [formatearFecha(p.birthday), p.place_of_birth ? ` · ${p.place_of_birth}` : ""] })] }) : null,
							p.deathday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Fallecimiento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatearFecha(p.deathday) })] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Género"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: genderLabel(p.gender) })] })
						]
					}),
					p.also_known_as.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["También conocido como: ", p.also_known_as.slice(0, 6).join(" · ")]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm leading-relaxed text-fg/90",
						children: p.biography || "Sin biografía en español."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							p.homepage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: p.homepage,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm",
								children: ["Página oficial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}) : null,
							ext?.imdb_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://www.imdb.com/name/${ext.imdb_id}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm",
								children: ["IMDb ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}) : null,
							ext?.instagram_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://instagram.com/${ext.instagram_id}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm",
								children: "Instagram"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://www.themoviedb.org/person/${p.id}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm",
								children: ["TMDb ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2",
				children: [["cast", `Interpretación (${cast.length})`], ["crew", `Equipo (${crew.length})`]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-9 rounded-full px-4 text-sm", tab === id ? "bg-accent text-accent-fg" : "bg-bg-subtle text-muted"),
					children: label
				}, id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
				children: lista.slice(0, 60).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					item,
					className: "w-full",
					mostrarTitulo: true
				}, `${item.tipo}-${item.id}`))
			})]
		})]
	});
}
//#endregion
export { PersonaPage as component };
