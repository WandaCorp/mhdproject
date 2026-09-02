import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as Heart, f as Clapperboard, i as Settings, n as TriangleAlert, s as House, t as X } from "../_libs/lucide-react.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as DialogPortal, d as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/configuracion-B849qBmS.js
/** Combina clases de Tailwind resolviendo conflictos. */
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var CATEGORIAS = [
	{
		slug: "episodios",
		titulo: "Episodios",
		descripcion: "Series que emiten capítulo hoy",
		tipo: "tv"
	},
	{
		slug: "estrenos-peliculas",
		titulo: "Estrenos de Películas",
		descripcion: "Próximos estrenos en cines",
		tipo: "movie"
	},
	{
		slug: "estrenos-series",
		titulo: "Estrenos de Series",
		descripcion: "Series que están por estrenarse",
		tipo: "tv"
	},
	{
		slug: "nuevas-peliculas",
		titulo: "Nuevas Películas",
		descripcion: "En cartelera ahora",
		tipo: "movie"
	},
	{
		slug: "nuevas-series",
		titulo: "Nuevas Series",
		descripcion: "Series recientes al aire",
		tipo: "tv"
	},
	{
		slug: "nuevos-animes",
		titulo: "Nuevos Animes",
		descripcion: "Animación japonesa reciente",
		tipo: "tv"
	},
	{
		slug: "nuevos-doramas",
		titulo: "Nuevos Doramas",
		descripcion: "Dramas de Asia reciente",
		tipo: "tv"
	},
	{
		slug: "top-peliculas",
		titulo: "Películas más populares",
		descripcion: "Top 10 del momento",
		tipo: "movie",
		esTop10: true
	},
	{
		slug: "top-series",
		titulo: "Series más populares",
		descripcion: "Top 10 del momento",
		tipo: "tv",
		esTop10: true
	},
	{
		slug: "colecciones",
		titulo: "Colecciones",
		descripcion: "Sagas y universos compartidos",
		tipo: "collection"
	}
];
var CATEGORIAS_MAP = Object.fromEntries(CATEGORIAS.map((c) => [c.slug, c]));
/** Colecciones icónicas de TMDb para el carrusel y el catálogo. */
var COLECCIONES_IDS = [
	10,
	119,
	1241,
	86311,
	9485,
	528,
	645,
	87359,
	263,
	230,
	328,
	121938,
	10194,
	1570,
	2344,
	84,
	295,
	556,
	86066,
	2806,
	173710,
	151,
	748,
	2980,
	535313,
	404609,
	131295,
	531242,
	94874,
	87096,
	8091,
	135483,
	264,
	1960,
	8650,
	386382,
	726871,
	131292,
	529322,
	453993
];
/**
* Preferencias del feed persistidas en localStorage.
*/
var STORAGE_KEY$1 = "sur-db-configuracion";
function seccionesPorDefecto() {
	return Object.fromEntries(CATEGORIAS.map((c) => [c.slug, true]));
}
var defaults = {
	calidadImagen: "media",
	tamanoPoster: "mediano",
	secciones: seccionesPorDefecto(),
	contenidoAdulto: false
};
function leer$1() {
	if (typeof window === "undefined") return defaults;
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (!raw) return defaults;
		const parsed = JSON.parse(raw);
		return {
			...defaults,
			...parsed,
			secciones: {
				...defaults.secciones,
				...parsed.secciones
			}
		};
	} catch {
		return defaults;
	}
}
function guardar$1(estado) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY$1, JSON.stringify({
		calidadImagen: estado.calidadImagen,
		tamanoPoster: estado.tamanoPoster,
		secciones: estado.secciones,
		contenidoAdulto: estado.contenidoAdulto
	}));
}
var useConfiguracion = create((set, get) => ({
	hidratado: false,
	...defaults,
	hidratar: () => {
		const data = leer$1();
		set({
			...data,
			hidratado: true
		});
		aplicarDom(data);
	},
	setCalidad: (calidadImagen) => {
		set({ calidadImagen });
		const s = get();
		guardar$1(s);
		aplicarDom(s);
	},
	setTamano: (tamanoPoster) => {
		set({ tamanoPoster });
		const s = get();
		guardar$1(s);
		aplicarDom(s);
	},
	setSeccion: (slug, visible) => {
		set((st) => ({ secciones: {
			...st.secciones,
			[slug]: visible
		} }));
		guardar$1(get());
	},
	setContenidoAdulto: (contenidoAdulto) => {
		set({ contenidoAdulto });
		guardar$1(get());
	}
}));
/** Sincroniza atributos del <html> usados por CSS de pósters. */
function aplicarDom(s) {
	if (typeof document === "undefined") return;
	document.documentElement.dataset.posterSize = s.tamanoPoster;
	document.documentElement.dataset.calidad = s.calidadImagen;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-B0ak4PzA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-wide",
				children: "Algo salió mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Ocurrió un error inesperado. Recarga la página."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-bg-subtle text-fg border border-border hover:border-border-strong",
			ghost: "text-fg hover:bg-bg-subtle",
			outline: "border border-border bg-transparent hover:bg-bg-subtle",
			ocean: "bg-ocean text-ocean-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-fg", className),
		...props
	});
}
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-full max-w-md flex-col border-border bg-bg-elevated shadow-xl", "transition-transform duration-300 ease-out", side === "right" ? "right-0 top-0 border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0" : "left-0 top-0 border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0", className),
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
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b border-border px-5 py-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-2xl tracking-wide", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border transition-colors", "data-[state=checked]:bg-accent data-[state=checked]:border-accent", "data-[state=unchecked]:bg-bg-subtle", "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg shadow-sm", "transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5", "data-[state=checked]:bg-accent-fg") })
	});
}
var CALIDADES = [
	{
		id: "baja",
		label: "Baja"
	},
	{
		id: "media",
		label: "Media"
	},
	{
		id: "alta",
		label: "Alta"
	}
];
var TAMANOS = [
	{
		id: "pequeno",
		label: "Pequeño"
	},
	{
		id: "mediano",
		label: "Mediano"
	},
	{
		id: "grande",
		label: "Grande"
	}
];
function PanelConfiguracion({ triggerClassName }) {
	const [abierto, setAbierto] = (0, import_react.useState)(false);
	const calidad = useConfiguracion((s) => s.calidadImagen);
	const tamano = useConfiguracion((s) => s.tamanoPoster);
	const secciones = useConfiguracion((s) => s.secciones);
	const adulto = useConfiguracion((s) => s.contenidoAdulto);
	const setCalidad = useConfiguracion((s) => s.setCalidad);
	const setTamano = useConfiguracion((s) => s.setTamano);
	const setSeccion = useConfiguracion((s) => s.setSeccion);
	const setAdulto = useConfiguracion((s) => s.setContenidoAdulto);
	const onAdulto = (v) => {
		if (v) {
			if (!window.confirm("Vas a habilitar contenido para adultos (+18). Puede aparecer en búsquedas y resultados del catálogo. ¿Continuar?")) return;
			setAdulto(true);
			toast.message("Contenido +18 activado. Las búsquedas pueden incluir material adulto.");
		} else {
			setAdulto(false);
			toast.success("Contenido +18 desactivado");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: abierto,
		onOpenChange: setAbierto,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				"aria-label": "Configuración del feed",
				className: triggerClassName,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Configuración" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Ajustes del feed y de las imágenes."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-6 overflow-y-auto px-5 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted",
					children: "Calidad de imágenes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: CALIDADES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCalidad(c.id),
						className: cn("h-10 rounded-md border text-sm", calidad === c.id ? "border-accent bg-accent/15 text-fg" : "border-border bg-bg-subtle text-muted"),
						children: c.label
					}, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted",
					children: "Tamaño de pósters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: TAMANOS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTamano(c.id),
						className: cn("h-10 rounded-md border text-sm", tamano === c.id ? "border-accent bg-accent/15 text-fg" : "border-border bg-bg-subtle text-muted"),
						children: c.label
					}, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Secciones del feed"
					}), CATEGORIAS.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `sec-${cat.slug}`,
							className: "text-sm font-normal",
							children: cat.titulo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: `sec-${cat.slug}`,
							checked: secciones[cat.slug],
							onCheckedChange: (v) => setSeccion(cat.slug, v)
						})]
					}, cat.slug))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "adulto",
							children: "Contenido adulto (+18)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Incluye resultados marcados como adultos en TMDb."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "adulto",
							checked: adulto,
							onCheckedChange: onAdulto
						})]
					}), adulto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-xs text-warn",
						children: "Advertencia: las búsquedas pueden devolver material +18."
					}) : null]
				})
			]
		})] })]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:border-accent", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Header() {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [buscarAbierto, setBuscarAbierto] = (0, import_react.useState)(false);
	const adulto = useConfiguracion((s) => s.contenidoAdulto);
	const onSubmit = (e) => {
		e.preventDefault();
		const query = q.trim();
		if (!query) {
			navigate({ to: "/buscar" });
			return;
		}
		navigate({
			to: "/buscar",
			search: {
				q: query,
				tipo: "todos"
			}
		});
		setBuscarAbierto(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-md bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-2xl leading-none tracking-wide",
						children: ["SUR ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "DB"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit,
					className: "mx-auto hidden flex-1 md:block md:max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Buscar películas, series o personas",
							className: "h-10 pl-9",
							"aria-label": "Buscar"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						adulto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-1 hidden rounded-full bg-warn px-2 py-0.5 text-[10px] font-bold text-bg sm:inline",
							children: "+18"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							"aria-label": "Buscar",
							onClick: () => setBuscarAbierto((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							asChild: true,
							"aria-label": "Favoritos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/favoritos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelConfiguracion, {})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("border-t border-border px-4 py-2 md:hidden", buscarAbierto ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar en SUR DB",
					"aria-label": "Buscar",
					autoFocus: buscarAbierto
				})
			})
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border px-4 py-8 text-center text-xs text-muted md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-lg tracking-wide text-fg",
			children: ["SUR ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-accent",
				children: "DB"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-xl",
			children: "Este producto usa la API de TMDb pero no está avalado ni certificado por TMDb. SUR DB es una base de datos cinematográfica independiente."
		})]
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Inicio",
		icon: House
	},
	{
		to: "/buscar",
		label: "Buscar",
		icon: Search
	},
	{
		to: "/favoritos",
		label: "Favoritos",
		icon: Heart
	}
];
function MobileNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-3",
			children: ITEMS.map((item) => {
				const activo = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]", activo ? "text-accent" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-5", activo && "fill-accent/20") }), item.label]
				}) }, item.to);
			})
		})
	});
}
/**
* Favoritos de películas y series en localStorage.
*/
var STORAGE_KEY = "sur-db-favoritos";
function leer() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function guardar(items) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
var useFavoritos = create((set, get) => ({
	hidratado: false,
	items: [],
	hidratar: () => set({
		items: leer(),
		hidratado: true
	}),
	esFavorito: (id, tipo) => get().items.some((i) => i.id === id && i.tipo === tipo),
	toggle: (item) => {
		const actual = get().items;
		const existe = actual.some((i) => i.id === item.id && i.tipo === item.tipo);
		const siguiente = existe ? actual.filter((i) => !(i.id === item.id && i.tipo === item.tipo)) : [{
			...item,
			agregadoEn: Date.now()
		}, ...actual];
		guardar(siguiente);
		set({ items: siguiente });
		return !existe;
	},
	quitar: (id, tipo) => {
		const siguiente = get().items.filter((i) => !(i.id === id && i.tipo === tipo));
		guardar(siguiente);
		set({ items: siguiente });
	}
}));
function AppShell({ children }) {
	const hidratarConfig = useConfiguracion((s) => s.hidratar);
	const hidratarFav = useFavoritos((s) => s.hidratar);
	(0, import_react.useEffect)(() => {
		hidratarConfig();
		hidratarFav();
	}, [hidratarConfig, hidratarFav]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-20 md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {})
		]
	});
}
function crearQueryClient() {
	return new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e5,
		gcTime: 18e5,
		refetchOnWindowFocus: false,
		retry: 1
	} } });
}
var clienteNavegador;
function getQueryClient() {
	if (typeof window === "undefined") return crearQueryClient();
	clienteNavegador ??= crearQueryClient();
	return clienteNavegador;
}
var styles_default = "/assets/styles-CUHtu6xo.css";
var APP_NAME = "SUR DB";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "SUR DB — base de datos cinematográfica de películas, series, animes y doramas."
			},
			{
				name: "theme-color",
				content: "#010013"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: RootDocument,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[50vh] flex-col items-center justify-center gap-2 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-5xl text-accent",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Página no encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Ese título no está en SUR DB."
			})
		]
	})
});
function RootDocument() {
	const queryClient = getQueryClient();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
					client: queryClient,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "bottom-right",
						toastOptions: { classNames: { toast: "bg-bg-elevated text-fg border-border" } }
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-BZn14nw1.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./buscar-C4XtOzdG.mjs");
var Route$7 = createFileRoute("/buscar")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : "",
		tipo: s.tipo === "pelicula" || s.tipo === "serie" || s.tipo === "persona" ? s.tipo : "todos"
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Buscar · SUR DB" }] })
});
var $$splitComponentImporter$6 = () => import("./favoritos-sIizGIg6.mjs");
var Route$6 = createFileRoute("/favoritos")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Favoritos · SUR DB" }] })
});
function esSlug(v) {
	return v in CATEGORIAS_MAP;
}
var $$splitComponentImporter$5 = () => import("./catalogo._categoria-DS2huz7a.mjs");
var Route$5 = createFileRoute("/catalogo/$categoria")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: ({ params }) => {
		return { meta: [{ title: `${(esSlug(params.categoria) ? CATEGORIAS_MAP[params.categoria] : null)?.titulo ?? "Catálogo"} · SUR DB` }] };
	}
});
var $$splitComponentImporter$4 = () => import("./coleccion._id-TULBtYAg.mjs");
var Route$4 = createFileRoute("/coleccion/$id")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Colección · SUR DB" }] })
});
var $$splitComponentImporter$3 = () => import("./pelicula._id-BNBWxikP.mjs");
var Route$3 = createFileRoute("/pelicula/$id")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Película · SUR DB" }] })
});
var $$splitComponentImporter$2 = () => import("./persona._id-DD8U1OlO.mjs");
var Route$2 = createFileRoute("/persona/$id")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Persona · SUR DB" }] })
});
var $$splitComponentImporter$1 = () => import("./serie._id-CCsQDyZ9.mjs");
var Route$1 = createFileRoute("/serie/$id")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Serie · SUR DB" }] })
});
var $$splitComponentImporter = () => import("./serie._id_.temporada._numero-CQZWBwCW.mjs");
var Route = createFileRoute("/serie/$id_/temporada/$numero")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Temporada · SUR DB" }] })
});
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	BuscarRoute: Route$7.update({
		id: "/buscar",
		path: "/buscar",
		getParentRoute: () => Route$9
	}),
	FavoritosRoute: Route$6.update({
		id: "/favoritos",
		path: "/favoritos",
		getParentRoute: () => Route$9
	}),
	CatalogoCategoriaRoute: Route$5.update({
		id: "/catalogo/$categoria",
		path: "/catalogo/$categoria",
		getParentRoute: () => Route$9
	}),
	ColeccionIdRoute: Route$4.update({
		id: "/coleccion/$id",
		path: "/coleccion/$id",
		getParentRoute: () => Route$9
	}),
	PeliculaIdRoute: Route$3.update({
		id: "/pelicula/$id",
		path: "/pelicula/$id",
		getParentRoute: () => Route$9
	}),
	PersonaIdRoute: Route$2.update({
		id: "/persona/$id",
		path: "/persona/$id",
		getParentRoute: () => Route$9
	}),
	SerieIdRoute: Route$1.update({
		id: "/serie/$id",
		path: "/serie/$id",
		getParentRoute: () => Route$9
	}),
	SerieIdTemporadaNumeroRoute: Route.update({
		id: "/serie/$id_/temporada/$numero",
		path: "/serie/$id/temporada/$numero",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { useConfiguracion as _, Route$3 as a, esSlug as c, Input as d, Button as f, cn as g, COLECCIONES_IDS as h, Route$2 as i, Route$7 as l, CATEGORIAS_MAP as m, Route as n, Route$4 as o, CATEGORIAS as p, Route$1 as r, Route$5 as s, router_exports as t, useFavoritos as u };
