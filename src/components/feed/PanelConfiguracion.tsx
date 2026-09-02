import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { CATEGORIAS } from "@/lib/tmdb/categorias";
import type { CalidadImagen, TamanoPoster } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";
import { useConfiguracion } from "@/store/configuracion";

const CALIDADES: { id: CalidadImagen; label: string }[] = [
  { id: "baja", label: "Baja" },
  { id: "media", label: "Media" },
  { id: "alta", label: "Alta" },
];

const TAMANOS: { id: TamanoPoster; label: string }[] = [
  { id: "pequeno", label: "Pequeño" },
  { id: "mediano", label: "Mediano" },
  { id: "grande", label: "Grande" },
];

export function PanelConfiguracion({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const calidad = useConfiguracion((s) => s.calidadImagen);
  const tamano = useConfiguracion((s) => s.tamanoPoster);
  const secciones = useConfiguracion((s) => s.secciones);
  const adulto = useConfiguracion((s) => s.contenidoAdulto);
  const setCalidad = useConfiguracion((s) => s.setCalidad);
  const setTamano = useConfiguracion((s) => s.setTamano);
  const setSeccion = useConfiguracion((s) => s.setSeccion);
  const setAdulto = useConfiguracion((s) => s.setContenidoAdulto);

  const onAdulto = (v: boolean) => {
    if (v) {
      const ok = window.confirm(
        "Vas a habilitar contenido para adultos (+18). Puede aparecer en búsquedas y resultados del catálogo. ¿Continuar?",
      );
      if (!ok) return;
      setAdulto(true);
      toast.message("Contenido +18 activado. Las búsquedas pueden incluir material adulto.");
    } else {
      setAdulto(false);
      toast.success("Contenido +18 desactivado");
    }
  };

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Configuración del feed"
          className={triggerClassName}
        >
          <Settings className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuración</SheetTitle>
          <p className="text-sm text-muted">Ajustes del feed y de las imágenes.</p>
        </SheetHeader>
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
              Calidad de imágenes
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {CALIDADES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCalidad(c.id)}
                  className={cn(
                    "h-10 rounded-md border text-sm",
                    calidad === c.id
                      ? "border-accent bg-accent/15 text-fg"
                      : "border-border bg-bg-subtle text-muted",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
              Tamaño de pósters
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {TAMANOS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setTamano(c.id)}
                  className={cn(
                    "h-10 rounded-md border text-sm",
                    tamano === c.id
                      ? "border-accent bg-accent/15 text-fg"
                      : "border-border bg-bg-subtle text-muted",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Secciones del feed
            </h3>
            {CATEGORIAS.map((cat) => (
              <div key={cat.slug} className="flex items-center justify-between gap-3">
                <Label htmlFor={`sec-${cat.slug}`} className="text-sm font-normal">
                  {cat.titulo}
                </Label>
                <Switch
                  id={`sec-${cat.slug}`}
                  checked={secciones[cat.slug]}
                  onCheckedChange={(v) => setSeccion(cat.slug, v)}
                />
              </div>
            ))}
          </section>

          <Separator />

          <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Label htmlFor="adulto">Contenido adulto (+18)</Label>
                <p className="text-xs text-muted">
                  Incluye resultados marcados como adultos en TMDb.
                </p>
              </div>
              <Switch id="adulto" checked={adulto} onCheckedChange={onAdulto} />
            </div>
            {adulto ? (
              <p className="rounded-md border border-warn/40 bg-warn/10 px-3 py-2 text-xs text-warn">
                Advertencia: las búsquedas pueden devolver material +18.
              </p>
            ) : null}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
