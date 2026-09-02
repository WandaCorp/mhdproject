import { QueryClient } from "@tanstack/react-query";

export function crearQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let clienteNavegador: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") return crearQueryClient();
  clienteNavegador ??= crearQueryClient();
  return clienteNavegador;
}
