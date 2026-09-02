import { Link } from "@tanstack/react-router";
import type { ItemMedia } from "@/lib/tmdb/types";

type Props = {
  item: Pick<ItemMedia, "id" | "tipo">;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/** Enlace tipado hacia la ficha según el tipo de medio. */
export function MediaLink({ item, className, children, ...rest }: Props) {
  switch (item.tipo) {
    case "tv":
      return (
        <Link to="/serie/$id" params={{ id: String(item.id) }} className={className} {...rest}>
          {children}
        </Link>
      );
    case "person":
      return (
        <Link to="/persona/$id" params={{ id: String(item.id) }} className={className} {...rest}>
          {children}
        </Link>
      );
    case "collection":
      return (
        <Link
          to="/coleccion/$id"
          params={{ id: String(item.id) }}
          className={className}
          {...rest}
        >
          {children}
        </Link>
      );
    default:
      return (
        <Link
          to="/pelicula/$id"
          params={{ id: String(item.id) }}
          className={className}
          {...rest}
        >
          {children}
        </Link>
      );
  }
}
