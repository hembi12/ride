"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import testimonials from "../data/testimonialsData";

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [screenCols, setScreenCols] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenCols(1);
        setVisibleCount(3);
      } else if (width < 1024) {
        setScreenCols(2);
        setVisibleCount(2);
      } else {
        setScreenCols(3);
        setVisibleCount(3);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const handleToggle = () => {
    const isExpanded = visibleCount >= testimonials.length;
    if (isExpanded) {
      setVisibleCount(screenCols);
    } else {
      const next = visibleCount + screenCols;
      setVisibleCount(Math.min(next, testimonials.length));
    }
  };

  const hasMore = visibleCount < testimonials.length;

  return (
    <section
      id="opiniones"
      className="relative py-20 px-4 sm:px-6 bg-fixed bg-center bg-cover bg-no-repeat text-white"
      style={{ backgroundImage: "url('/morelia.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Valoraciones verificadas
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {testimonials.slice(0, visibleCount).map((t, index) => (
          <div
            key={index}
            className="bg-black/30 backdrop-blur-md text-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform-gpu hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                {t.date && (
                  <p className="text-xs text-gray-300">
                    {new Date(t.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
              {t.service && (
                <p className="text-xs mt-1">
                  <span className="text-white">Servicio usado: </span>
                  <span className="text-green-400 font-medium">
                    {t.service}
                  </span>
                </p>
              )}
              <div className="flex mt-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-200 italic leading-relaxed">
              “{t.text}”
            </p>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center mt-8">
        <button
          onClick={handleToggle}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {hasMore ? "Ver más opiniones" : "Ver menos"}
        </button>
      </div>
    </section>
  );
}
