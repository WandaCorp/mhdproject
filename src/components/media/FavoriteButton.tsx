import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavoritos, type Favorito } from "@/store/favoritos";

export function FavoriteButton({
  item,
  className,
}: {
  item: Omit<Favorito, "agregadoEn">;
  className?: string;
}) {
  const hidratado = useFavoritos((s) => s.hidratado);
  const activo = useFavoritos((s) => s.esFavorito(item.id, item.tipo));
  const toggle = useFavoritos((s) => s.toggle);

  const onClick = () => {
    const agregado = toggle(item);
    if (agregado) toast.success("Agregado a favoritos");
    else toast.message("Eliminado de favoritos");
  };

  return (
    <Button
      type="button"
      variant={activo ? "default" : "secondary"}
      onClick={onClick}
      disabled={!hidratado}
      className={cn("min-w-44", className)}
      aria-pressed={activo}
    >
      <Heart className={cn("size-4", activo && "fill-current")} />
      {activo ? "En favoritos" : "Agregar a favoritos"}
    </Button>
  );
}
