/**
 * Favoritos de películas y series en localStorage.
 */
import { create } from "zustand";
import type { TipoMedia } from "@/lib/tmdb/types";

const STORAGE_KEY = "sur-db-favoritos";

export interface Favorito {
  id: number;
  tipo: Extract<TipoMedia, "movie" | "tv">;
  titulo: string;
  poster: string | null;
  fecha: string;
  calificacion: number;
  agregadoEn: number;
}

interface FavoritosEstado {
  hidratado: boolean;
  items: Favorito[];
  hidratar: () => void;
  esFavorito: (id: number, tipo: Favorito["tipo"]) => boolean;
  toggle: (item: Omit<Favorito, "agregadoEn">) => boolean;
  quitar: (id: number, tipo: Favorito["tipo"]) => void;
}

function leer(): Favorito[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Favorito[]) : [];
  } catch {
    return [];
  }
}

function guardar(items: Favorito[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useFavoritos = create<FavoritosEstado>((set, get) => ({
  hidratado: false,
  items: [],
  hidratar: () => set({ items: leer(), hidratado: true }),
  esFavorito: (id, tipo) =>
    get().items.some((i) => i.id === id && i.tipo === tipo),
  toggle: (item) => {
    const actual = get().items;
    const existe = actual.some((i) => i.id === item.id && i.tipo === item.tipo);
    const siguiente = existe
      ? actual.filter((i) => !(i.id === item.id && i.tipo === item.tipo))
      : [{ ...item, agregadoEn: Date.now() }, ...actual];
    guardar(siguiente);
    set({ items: siguiente });
    return !existe;
  },
  quitar: (id, tipo) => {
    const siguiente = get().items.filter((i) => !(i.id === id && i.tipo === tipo));
    guardar(siguiente);
    set({ items: siguiente });
  },
}));
