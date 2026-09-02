import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { useConfiguracion } from "@/store/configuracion";
import { useFavoritos } from "@/store/favoritos";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hidratarConfig = useConfiguracion((s) => s.hidratar);
  const hidratarFav = useFavoritos((s) => s.hidratar);

  useEffect(() => {
    hidratarConfig();
    hidratarFav();
  }, [hidratarConfig, hidratarFav]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
}
