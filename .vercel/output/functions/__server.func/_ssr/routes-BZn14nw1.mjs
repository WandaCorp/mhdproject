import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as ChevronLeft, p as ChevronRight, r as Star } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useConfiguracion, g as cn, p as CATEGORIAS } from "./router-B0ak4PzA.mjs";
import { a as anioDe, i as PosterRowSkeleton, m as urlImagen, o as etiquetaTipo, r as HeroSkeleton, s as formatearCalificacion } from "./Skeletons-D9bSW7Ls.mjs";
import { n as PosterCard, t as MediaLink } from "./PosterCard-pUnDXXev.mjs";
import { l as obtenerTrending, n as limiteFeed, r as obtenerCategoria } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZn14nw1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTERVALO = 6500;
function HeroSlider({ items, cargando }) {
	const slides = items.filter((i) => i.backdrop).slice(0, 8);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [pausado, setPausado] = (0, import_react.useState)(false);
	const startX = (0, import_react.useRef)(null);
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const ir = (0, import_react.useCallback)((dir) => {
		if (slides.length === 0) return;
		setIndex((i) => (i + dir + slides.length) % slides.length);
	}, [slides.length]);
	(0, import_react.useEffect)(() => {
		if (pausado || slides.length < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const id = window.setInterval(() => ir(1), INTERVALO);
		return () => window.clearInterval(id);
	}, [
		pausado,
		slides.length,
		ir
	]);
	const onPointerDown = (e) => {
		startX.current = e.clientX;
	};
	const onPointerUp = (e) => {
		if (startX.current == null) return;
		const dx = e.clientX - startX.current;
		startX.current = null;
		if (Math.abs(dx) > 48) ir(dx < 0 ? 1 : -1);
	};
	if (cargando) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSkeleton, {});
	if (slides.length === 0) return null;
	const actual = slides[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative isolate overflow-hidden",
		onMouseEnter: () => setPausado(true),
		onMouseLeave: () => setPausado(false),
		onPointerDown,
		onPointerUp,
		"aria-roledescription": "carrusel",
		"aria-label": "Destacados",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] max-h-[86vh] min-h-[280px] w-full md:aspect-[21/9]",
			children: [
				slides.map((slide, i) => {
					const img = urlImagen(slide.backdrop, "backdrop", calidad);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("hero-slide absolute inset-0 transition-opacity duration-500 ease-out", i === index ? "opacity-100" : "opacity-0"),
						"aria-hidden": i !== index,
						children: img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img,
							alt: "",
							className: "size-full object-cover",
							draggable: false
						}) : null
					}, `${slide.tipo}-${slide.id}`);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay pointer-events-none absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLink, {
					item: actual,
					className: "absolute inset-0 z-10",
					"aria-label": `Ver ficha de ${actual.titulo}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: actual.titulo
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 z-20 rounded-full bg-bg/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-fg backdrop-blur-sm md:left-8 md:top-6",
					children: etiquetaTipo(actual.tipo)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute bottom-6 left-4 z-20 max-w-[min(90%,36rem)] md:bottom-10 md:left-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-none tracking-wide text-fg md:text-6xl",
						children: actual.titulo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-2 text-sm text-fg md:text-base",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: anioDe(actual.fecha) || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "•"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-warn text-warn" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatearCalificacion(actual.calificacion)
							})
						]
					})]
				}),
				slides.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Anterior",
						onClick: () => ir(-1),
						className: "absolute left-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/50 text-fg md:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Siguiente",
						onClick: () => ir(1),
						className: "absolute right-2 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/50 text-fg md:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5",
						children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Ir al destacado ${i + 1}`,
							onClick: () => setIndex(i),
							className: cn("h-1.5 rounded-full transition-[width,background-color] duration-200", i === index ? "w-6 bg-accent" : "w-1.5 bg-fg/40")
						}, i))
					})
				] }) : null
			]
		})
	});
}
function PosterRow({ categoria, items, cargando, error }) {
	const scroller = (0, import_react.useRef)(null);
	const scroll = (dir) => {
		const el = scroller.current;
		if (!el) return;
		el.scrollBy({
			left: dir * Math.min(el.clientWidth * .8, 480),
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative px-4 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide text-fg md:text-3xl",
				children: categoria.titulo
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: categoria.descripcion
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogo/$categoria",
				params: { categoria: categoria.slug },
				className: "text-xs font-semibold uppercase tracking-widest text-accent hover:opacity-80",
				children: "Ver todo"
			})]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-sm text-muted",
			children: "No se pudo cargar esta sección."
		}) : cargando ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRowSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-sm text-muted",
			children: "Sin resultados por ahora."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group/row relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Anterior",
					onClick: () => scroll(-1),
					className: "absolute left-0 top-1/2 z-10 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg-elevated/90 text-fg shadow md:group-hover/row:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scroller,
					className: "feed-scroll",
					children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
						item,
						ranking: categoria.esTop10 ? i + 1 : void 0
					}, `${item.tipo}-${item.id}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Siguiente",
					onClick: () => scroll(1),
					className: "absolute right-0 top-1/2 z-10 hidden size-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg-elevated/90 text-fg shadow md:group-hover/row:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})
			]
		})]
	});
}
function SeccionFeed({ slug, visible, adulto }) {
	const cat = CATEGORIAS.find((c) => c.slug === slug);
	const query = useQuery({
		queryKey: [
			"feed",
			slug,
			adulto
		],
		queryFn: () => obtenerCategoria(slug, 1, adulto),
		enabled: visible
	});
	if (!visible) return null;
	const items = (query.data?.results ?? []).slice(0, limiteFeed(slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
		categoria: cat,
		items,
		cargando: query.isLoading,
		error: query.isError
	});
}
function FeedHome() {
	const adulto = useConfiguracion((s) => s.contenidoAdulto);
	const secciones = useConfiguracion((s) => s.secciones);
	const trending = useQuery({
		queryKey: ["trending", adulto],
		queryFn: () => obtenerTrending(adulto)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, {
			items: trending.data ?? [],
			cargando: trending.isLoading
		}), CATEGORIAS.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeccionFeed, {
			slug: cat.slug,
			visible: secciones[cat.slug] !== false,
			adulto
		}, cat.slug))]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedHome, {});
}
//#endregion
export { Home as component };
