export function Footer() {
  return (
    <footer className="mt-auto border-t border-border px-4 py-8 text-center text-xs text-muted md:px-8">
      <p className="font-display text-lg tracking-wide text-fg">
        SUR <span className="text-accent">DB</span>
      </p>
      <p className="mx-auto mt-2 max-w-xl">
        Este producto usa la API de TMDb pero no está avalado ni certificado por
        TMDb. SUR DB es una base de datos cinematográfica independiente.
      </p>
    </footer>
  );
}
