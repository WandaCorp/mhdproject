import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Heart, d as Clock, h as Calendar, l as Globe, o as Play, r as Star, t as X, u as ExternalLink } from "../_libs/lucide-react.mjs";
import { a as DialogPortal$1, i as DialogOverlay$1, n as DialogClose, o as DialogTitle$1, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useConfiguracion, f as Button, g as cn, u as useFavoritos } from "./router-B0ak4PzA.mjs";
import { a as anioDe, c as formatearDinero, h as urlLogoProveedor, l as formatearFecha, m as urlImagen, p as normalizarItem, s as formatearCalificacion, u as formatearRuntime } from "./Skeletons-D9bSW7Ls.mjs";
import { n as PosterCard } from "./PosterCard-pUnDXXev.mjs";
import { u as trailerYoutube } from "./api-B8lcdUtq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FichaMedia-BTgHXsfx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoriteButton({ item, className }) {
	const hidratado = useFavoritos((s) => s.hidratado);
	const activo = useFavoritos((s) => s.esFavorito(item.id, item.tipo));
	const toggle = useFavoritos((s) => s.toggle);
	const onClick = () => {
		if (toggle(item)) toast.success("Agregado a favoritos");
		else toast.message("Eliminado de favoritos");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: activo ? "default" : "secondary",
		onClick,
		disabled: !hidratado,
		className: cn("min-w-44", className),
		"aria-pressed": activo,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", activo && "fill-current") }), activo ? "En favoritos" : "Agregar a favoritos"]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", {
	variants: { variant: {
		default: "bg-bg-subtle text-fg",
		accent: "bg-accent text-accent-fg",
		ocean: "bg-ocean text-ocean-fg",
		rank: "bg-rank text-rank-fg",
		outline: "border border-border text-muted",
		warn: "bg-warn text-bg"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-bg-elevated p-4 shadow-xl", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Cerrar"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl tracking-wide", className),
		...props
	});
}
function esPelicula(m) {
	return "title" in m;
}
function proveedoresDe(m) {
	const map = m["watch/providers"]?.results;
	if (!map) return void 0;
	return map.MX || map.AR || map.ES || map.US || Object.values(map)[0];
}
function CastRow({ cast }) {
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const lista = cast.slice(0, 16);
	if (lista.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-2xl tracking-wide",
			children: "Reparto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "feed-scroll",
			children: lista.map((p) => {
				const src = urlImagen(p.profile_path, "profile", calidad);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/persona/$id",
					params: { id: String(p.id) },
					className: "w-[7.5rem] shrink-0 snap-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[2/3] overflow-hidden rounded-[4px] bg-bg-subtle",
							children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "size-full object-cover",
								loading: "lazy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-full items-end p-2 text-xs text-muted",
								children: p.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-xs text-fg",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-1 text-[11px] text-muted",
							children: p.character
						})
					]
				}, p.id);
			})
		})]
	});
}
function EnlacesExternos({ homepage, imdb, tmdbPath }) {
	const enlaces = [
		homepage ? {
			href: homepage,
			label: "Página oficial"
		} : null,
		imdb ? {
			href: `https://www.imdb.com/title/${imdb}`,
			label: "IMDb"
		} : null,
		{
			href: `https://www.themoviedb.org${tmdbPath}`,
			label: "TMDb"
		}
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: enlaces.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: e.href,
			target: "_blank",
			rel: "noreferrer",
			className: "inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-3 text-sm text-fg hover:border-accent",
			children: [e.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
		}, e.label))
	});
}
function FichaMedia({ media, tipo }) {
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const [trailerAbierto, setTrailerAbierto] = (0, import_react.useState)(false);
	const pelicula = esPelicula(media);
	const titulo = pelicula ? media.title : media.name;
	const original = pelicula ? media.original_title : media.original_name;
	const fecha = pelicula ? media.release_date : media.first_air_date;
	const poster = urlImagen(media.poster_path, "poster", calidad);
	const backdrop = urlImagen(media.backdrop_path, "backdrop", "alta");
	const key = trailerYoutube(media.videos);
	const director = media.credits?.crew.find((c) => c.job === "Director");
	const creadores = !pelicula ? media.created_by : [];
	const runtime = pelicula ? formatearRuntime(media.runtime) : formatearRuntime(media.episode_run_time?.[0]);
	const proveedores = proveedoresDe(media);
	const recs = (media.recommendations?.results ?? []).map((r) => normalizarItem(r, tipo)).slice(0, 14);
	const imdb = media.external_ids?.imdb_id || (pelicula ? media.imdb_id : null);
	const ficha = (0, import_react.useMemo)(() => {
		const filas = [
			{
				k: "Título original",
				v: original
			},
			{
				k: "Estado",
				v: media.status
			},
			{
				k: "Idioma original",
				v: pelicula ? "" : media.origin_country.join(", ")
			}
		];
		if (pelicula) filas.push({
			k: "Presupuesto",
			v: formatearDinero(media.budget)
		}, {
			k: "Recaudación",
			v: formatearDinero(media.revenue)
		});
		else filas.push({
			k: "Temporadas",
			v: String(media.number_of_seasons)
		}, {
			k: "Episodios",
			v: String(media.number_of_episodes)
		}, {
			k: "Tipo",
			v: media.type
		});
		filas.push({
			k: "Productoras",
			v: media.production_companies.map((c) => c.name).join(", ") || "—"
		});
		filas.push({
			k: "Países",
			v: media.production_countries.map((c) => c.name).join(", ") || "—"
		});
		return filas.filter((f) => f.v);
	}, [
		media,
		original,
		pelicula
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative isolate min-h-[42vh] overflow-hidden md:min-h-[56vh]",
			children: [backdrop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: backdrop,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay absolute inset-0" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto -mt-36 max-w-6xl px-4 pb-16 md:-mt-44 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 md:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-44 shrink-0 overflow-hidden rounded-[4px] shadow-xl md:mx-0 md:w-56",
						children: poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: poster,
							alt: `Póster de ${titulo}`,
							className: "w-full"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex aspect-[2/3] items-end bg-bg-subtle p-3 font-display text-xl",
							children: titulo
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: pelicula ? "Película" : "Serie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl leading-none tracking-wide md:text-6xl",
								children: titulo
							}),
							media.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm italic text-muted",
								children: media.tagline
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5 text-muted" }), formatearFecha(fecha) || anioDe(fecha) || "—"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-warn text-warn" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums",
												children: formatearCalificacion(media.vote_average)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted",
												children: [
													"(",
													media.vote_count.toLocaleString("es-MX"),
													")"
												]
											})
										]
									}),
									runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-muted" }), runtime]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: media.genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "default",
									children: g.name
								}, g.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-3xl text-sm leading-relaxed text-fg/90",
								children: media.overview || "Sin sinopsis disponible."
							}),
							director ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "Dirección: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/persona/$id",
									params: { id: String(director.id) },
									className: "text-accent hover:underline",
									children: director.name
								})]
							}) : null,
							creadores.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "Creación: "
								}), creadores.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 ? ", " : "", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/persona/$id",
									params: { id: String(c.id) },
									className: "text-accent hover:underline",
									children: c.name
								})] }, c.id))]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { item: {
									id: media.id,
									tipo,
									titulo,
									poster: media.poster_path,
									fecha,
									calificacion: media.vote_average
								} }), key ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ocean",
									onClick: () => setTrailerAbierto(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Ver trailer"]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnlacesExternos, {
								homepage: media.homepage,
								imdb,
								tmdbPath: pelicula ? `/movie/${media.id}` : `/tv/${media.id}`
							})
						]
					})]
				}),
				proveedores && (proveedores.flatrate || proveedores.rent || proveedores.buy) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-3 inline-flex items-center gap-2 font-display text-2xl tracking-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-5 text-ocean" }), "Dónde ver"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3",
						children: (proveedores.flatrate || proveedores.rent || proveedores.buy || []).slice(0, 10).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md bg-bg-subtle px-2 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: urlLogoProveedor(p.logo_path),
								alt: "",
								className: "size-8 rounded-[4px]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: p.provider_name
							})]
						}, p.provider_id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-2xl tracking-wide",
						children: "Ficha técnica"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "grid gap-3 sm:grid-cols-2",
						children: ficha.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-bg-elevated p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-wider text-muted",
								children: f.k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm",
								children: f.v
							})]
						}, f.k))
					})]
				}),
				!pelicula && media.seasons?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-2xl tracking-wide",
						children: "Temporadas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: media.seasons.filter((t) => t.season_number > 0).map((t) => {
							const src = urlImagen(t.poster_path, "poster", calidad);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/serie/$id/temporada/$numero",
								params: {
									id: String(media.id),
									numero: String(t.season_number)
								},
								className: "flex gap-3 overflow-hidden rounded-lg bg-bg-elevated p-2 hover:ring-1 hover:ring-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-24 w-16 shrink-0 overflow-hidden rounded-[4px] bg-bg-subtle",
									children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src,
										alt: "",
										className: "size-full object-cover"
									}) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: t.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											t.episode_count,
											" episodios",
											t.air_date ? ` · ${anioDe(t.air_date)}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-xs text-subtle",
										children: t.overview
									})
								] })]
							}, t.id);
						})
					})]
				}) : null,
				pelicula && media.belongs_to_collection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-2xl tracking-wide",
						children: "Colección"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/coleccion/$id",
						params: { id: String(media.belongs_to_collection.id) },
						className: "inline-flex items-center gap-3 rounded-lg bg-bg-elevated p-3 hover:ring-1 hover:ring-accent",
						children: [media.belongs_to_collection.poster_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: urlImagen(media.belongs_to_collection.poster_path, "poster", calidad) ?? "",
							alt: "",
							className: "h-24 w-16 rounded-[4px] object-cover"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: media.belongs_to_collection.name })]
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-10 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CastRow, { cast: media.credits?.cast ?? [] }), recs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-2xl tracking-wide",
					children: "Recomendados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "feed-scroll",
					children: recs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, { item }, `${item.tipo}-${item.id}`))
				})]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: trailerAbierto,
			onOpenChange: setTrailerAbierto,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: cn("p-2 sm:p-3"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "sr-only",
					children: ["Trailer de ", titulo]
				}), key ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video overflow-hidden rounded-md bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: `Trailer de ${titulo}`,
						src: `https://www.youtube.com/embed/${key}?autoplay=1`,
						className: "size-full",
						allow: "autoplay; encrypted-media",
						allowFullScreen: true
					})
				}) : null]
			})
		})
	] });
}
//#endregion
export { FichaMedia as t };
