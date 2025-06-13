"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Handshake,
  UserCheck,
  CreditCard,
  Smartphone,
  MapPin,
  PawPrint,
} from "lucide-react";

const benefits = [
  {
    icon: <UserCheck className="w-10 h-10 text-purple-500 mx-auto mb-4" />,
    title: "Experiencia comprobada",
    description:
      "Más de 9 años de servicio con valoraciones reales de pasajeros satisfechos.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-500 mx-auto mb-4" />,
    title: "Seguridad en cada viaje",
    description:
      "Como conductor privado, priorizo tu seguridad con atención directa y sin intermediarios.",
  },
  {
    icon: <Handshake className="w-10 h-10 text-blue-500 mx-auto mb-4" />,
    title: "Trato cercano y directo",
    description:
      "Hablas y reservas directamente conmigo, sin aplicaciones ni terceros.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-red-500 mx-auto mb-4" />,
    title: "Cobertura amplia",
    description:
      "Viajes locales, foráneos y al aeropuerto. Me adapto a tus necesidades.",
  },
  {
    icon: <PawPrint className="w-10 h-10 text-indigo-500 mx-auto mb-4" />,
    title: "Pet Friendly",
    description:
      "Tu mascota es bienvenida. Viaja con comodidad y sin preocupaciones adicionales.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-yellow-500 mx-auto mb-4" />,
    title: "Pagos a tu medida",
    description:
      "Acepto tarjeta, transferencia, efectivo o link seguro. Tú eliges.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-pink-500 mx-auto mb-4" />,
    title: "Sin apps ni registros innecesarios",
    description:
      "No necesitas descargar nada ni registrarte en plataformas. Todo es simple y directo.",
  },
];

export default function Benefits() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % benefits.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrent((prev) => (prev + 1) % benefits.length);
    } else if (touchEndX.current - touchStartX.current > 50) {
      setCurrent((prev) => (prev - 1 + benefits.length) % benefits.length);
    }
  };

  return (
    <section
      id="beneficios"
      className="relative py-28 px-6 text-white bg-fixed bg-center bg-cover overflow-hidden shadow-xl"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Sin apps, sin comisiones, sin complicaciones.
        </h2>

        <div
          className="bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-xl mx-auto transition-all duration-500"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {benefits[current].icon}
          <h3 className="text-3xl font-bold mb-2 text-white">
            {benefits[current].title}
          </h3>
          <p className="text-md text-gray-200 leading-relaxed">
            {benefits[current].description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {benefits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === current ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <a
          href="#reserva"
          className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
        >
          Reserva tu viaje ahora
        </a>
      </div>
    </section>
  );
}
