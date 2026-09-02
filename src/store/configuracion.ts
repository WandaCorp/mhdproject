/**
 * Preferencias del feed persistidas en localStorage.
 */
import { create } from "zustand";
import type { CalidadImagen, TamanoPoster } from "@/lib/tmdb/types";
import { CATEGORIAS, type SlugCategoria } from "@/lib/tmdb/categorias";

const STORAGE_KEY = "sur-db-configuracion";

export type SeccionesVisibles = Record<SlugCategoria, boolean>;

function seccionesPorDefecto(): SeccionesVisibles {
  return Object.fromEntries(CATEGORIAS.map((c) => [c.slug, true])) as SeccionesVisibles;
}

export interface ConfiguracionEstado {
  hidratado: boolean;
  calidadImagen: CalidadImagen;
  tamanoPoster: TamanoPoster;
  secciones: SeccionesVisibles;
  contenidoAdulto: boolean;
  hidratar: () => void;
  setCalidad: (v: CalidadImagen) => void;
  setTamano: (v: TamanoPoster) => void;
  setSeccion: (slug: SlugCategoria, visible: boolean) => void;
  setContenidoAdulto: (v: boolean) => void;
}

type Persistible = Pick<
  ConfiguracionEstado,
  "calidadImagen" | "tamanoPoster" | "secciones" | "contenidoAdulto"
>;

const defaults: Persistible = {
  calidadImagen: "media",
  tamanoPoster: "mediano",
  secciones: seccionesPorDefecto(),
  contenidoAdulto: false,
};

function leer(): Persistible {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<Persistible>;
    return {
      ...defaults,
      ...parsed,
      secciones: { ...defaults.secciones, ...parsed.secciones },
    };
  } catch {
    return defaults;
  }
}

function guardar(estado: Persistible) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      calidadImagen: estado.calidadImagen,
      tamanoPoster: estado.tamanoPoster,
      secciones: estado.secciones,
      contenidoAdulto: estado.contenidoAdulto,
    }),
  );
}

export const useConfiguracion = create<ConfiguracionEstado>((set, get) => ({
  hidratado: false,
  ...defaults,
  hidratar: () => {
    const data = leer();
    set({ ...data, hidratado: true });
    aplicarDom(data);
  },
  setCalidad: (calidadImagen) => {
    set({ calidadImagen });
    const s = get();
    guardar(s);
    aplicarDom(s);
  },
  setTamano: (tamanoPoster) => {
    set({ tamanoPoster });
    const s = get();
    guardar(s);
    aplicarDom(s);
  },
  setSeccion: (slug, visible) => {
    set((st) => ({ secciones: { ...st.secciones, [slug]: visible } }));
    guardar(get());
  },
  setContenidoAdulto: (contenidoAdulto) => {
    set({ contenidoAdulto });
    guardar(get());
  },
}));

/** Sincroniza atributos del <html> usados por CSS de pósters. */
function aplicarDom(s: Persistible) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.posterSize = s.tamanoPoster;
  document.documentElement.dataset.calidad = s.calidadImagen;
}
