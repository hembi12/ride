"use client";
import { Star, ShieldCheck, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen px-6 pt-32 pb-24 text-center text-white overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Gradiente de overlay para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          Tu viaje comienza con confianza
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Traslados seguros, puntuales y personalizados. Más de 1100 clientes satisfechos respaldan cada trayecto.
        </p>
        <a
          href="#reserva"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition"
        >
          Reserva tu viaje ahora
        </a>

        {/* Elementos de confianza */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            4.9 de calificación promedio
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            100% trayectos seguros
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            99% puntualidad comprobada
          </div>
        </div>
      </div>
    </section>
  );
}