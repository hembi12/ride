"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: "servicios", label: "Servicios" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "about", label: "Vehículos" },
    { id: "opiniones", label: "Valoraciones" },
    { id: "como-reservar", label: "¿Cómo reservar?" },
    { id: "paymentmethods", label: "Métodos de pago" },
    { id: "reserva", label: "Reserva online" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Transporte Privado
        </Link>

        {/* Menú horizontal visible solo en pantallas grandes */}
        <div className="hidden lg:flex space-x-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-base text-gray-700 hover:text-indigo-700 transition font-medium"
            >
              {section.label}
            </a>
          ))}
        </div>

        {/* Botón hamburguesa solo en móviles/tablets */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú desplegable para móviles/tablets */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-base text-gray-700 hover:text-indigo-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              {section.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}