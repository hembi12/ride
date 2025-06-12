import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-8 px-6 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
        {/* Texto legal */}
        <div>
          <p className="text-neutral-200">
            © {new Date().getFullYear()} Transporte Privado • Todos los derechos reservados
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Sitio desarrollado por{" "}
            <a
              href="https://hectormartil.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-indigo-400"
            >
              Héctor Martil
            </a>
          </p>
        </div>

        {/* Enlaces legales */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-neutral-200">
          <Link href="/privacidad" className="hover:underline">
            Privacidad
          </Link>
          <Link href="/accesibilidad" className="hover:underline">
            Accesibilidad
          </Link>
          <Link href="/terminos" className="hover:underline">
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}