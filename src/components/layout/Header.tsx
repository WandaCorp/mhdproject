import { Link, useNavigate } from "@tanstack/react-router";
import { Clapperboard, Heart, Search } from "lucide-react";
import { useState } from "react";
import { PanelConfiguracion } from "@/components/feed/PanelConfiguracion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfiguracion } from "@/store/configuracion";
import { cn } from "@/lib/utils";

export function Header() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [buscarAbierto, setBuscarAbierto] = useState(false);
  const adulto = useConfiguracion((s) => s.contenidoAdulto);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      navigate({ to: "/buscar" });
      return;
    }
    navigate({ to: "/buscar", search: { q: query, tipo: "todos" } });
    setBuscarAbierto(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-fg">
            <Clapperboard className="size-5" />
          </span>
          <span className="font-display text-2xl leading-none tracking-wide">
            SUR <span className="text-accent">DB</span>
          </span>
        </Link>

        <form onSubmit={onSubmit} className="mx-auto hidden flex-1 md:block md:max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar películas, series o personas"
              className="h-10 pl-9"
              aria-label="Buscar"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1">
          {adulto ? (
            <span className="mr-1 hidden rounded-full bg-warn px-2 py-0.5 text-[10px] font-bold text-bg sm:inline">
              +18
            </span>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buscar"
            onClick={() => setBuscarAbierto((v) => !v)}
          >
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Favoritos">
            <Link to="/favoritos">
              <Heart className="size-5" />
            </Link>
          </Button>
          <PanelConfiguracion />
        </div>
      </div>
      <div
        className={cn(
          "border-t border-border px-4 py-2 md:hidden",
          buscarAbierto ? "block" : "hidden",
        )}
      >
        <form onSubmit={onSubmit}>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar en SUR DB"
            aria-label="Buscar"
            autoFocus={buscarAbierto}
          />
        </form>
      </div>
    </header>
  );
}
