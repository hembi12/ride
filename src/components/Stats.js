"use client";

import {
  Star,
  Zap,
  Calendar,
  Clock,
  ThumbsUp,
  Repeat,
  Users,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const statsData = [
  {
    icon: <ThumbsUp className="w-10 h-10 text-emerald-400" />,
    value: "4.97",
    animated: false,
    label: "Calificación promedio",
  },
  {
    icon: <Star className="w-10 h-10 text-yellow-400" />,
    value: 26100,
    suffix: "",
    label: "Valoraciones de 5 estrellas",
  },
  {
    icon: <Clock className="w-10 h-10 text-green-400" />,
    value: 99,
    suffix: "%",
    label: "Tasa de puntualidad",
  },
  {
    icon: <MapPin className="w-10 h-10 text-red-400" />,
    value: 300,
    suffix: "k",
    label: "Kilómetros recorridos",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-cyan-400" />,
    value: 100,
    suffix: "%",
    label: "Trayectos seguros",
  },
  {
    icon: <Calendar className="w-10 h-10 text-blue-400" />,
    value: 9,
    suffix: " años",
    label: "De experiencia",
  },
  {
    icon: <Repeat className="w-10 h-10 text-purple-400" />,
    value: 89,
    suffix: "%",
    label: "Clientes recurrentes",
  },
  {
    icon: <Zap className="w-10 h-10 text-indigo-400" />,
    value: 29850,
    suffix: "",
    label: "Viajes completados",
  },
  {
    icon: <Users className="w-10 h-10 text-pink-400" />,
    value: 19900,
    suffix: "",
    label: "Clientes satisfechos",
  },
];

export default function Stats() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsLargeScreen(window.innerWidth >= 1024); // lg: breakpoint
    };

    updateScreenSize(); // Inicial
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, statsData.length));
  };

  const showLess = () => setVisibleCount(3);

  const isAllVisible = visibleCount >= statsData.length;

  let cardsToShow = statsData;

  if (isMobile) {
    cardsToShow = statsData.slice(0, visibleCount);
  } else if (isLargeScreen && statsData.length % 4 !== 0) {
    // Oculta la última tarjeta si hay una fila incompleta en 4 columnas
    cardsToShow = statsData.slice(0, statsData.length - 1);
  }

  return (
    <section
      id="estadisticas"
      className="relative py-20 px-6 text-white bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/lucha.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cardsToShow.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {isMobile && (
        <div className="relative z-10 mt-8 text-center">
          {!isAllVisible ? (
            <button
              onClick={showMore}
              className="text-white underline hover:text-indigo-300 transition"
            >
              Mostrar más
            </button>
          ) : (
            <button
              onClick={showLess}
              className="text-white underline hover:text-indigo-300 transition"
            >
              Mostrar menos
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function StatCard({ icon, value, suffix = "", label, animated = true }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="bg-black/70 backdrop-blur-md text-white rounded-xl p-6 shadow-md hover:shadow-lg transition transform-gpu hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex-shrink-0">{icon}</div>
        <div>
          <p className="text-3xl font-bold leading-tight">
            {animated && typeof value === "number" && inView ? (
              <CountUp end={value} duration={1.8} suffix={suffix} />
            ) : (
              `${value}${suffix}`
            )}
          </p>
          <p className="text-sm text-gray-200 leading-tight">{label}</p>
        </div>
      </div>
    </div>
  );
}