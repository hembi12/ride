"use client";

import Image from "next/image";
import { useState } from "react";

const cars = [
  {
    src: "/auto.png",
    alt: "Vehículo 1",
    marca: "Nissan Versa 2022",
    color: "Gris Oxford",
    placas: "ABC-123-CDMX",
    servicio: "Uber Comfort",
    caracteristicas: "Aire acondicionado, asientos cómodos, espacio para equipaje",
    flip: false,
  },
  {
    src: "/auto2.png",
    alt: "Vehículo 2",
    marca: "Chevrolet Onix 2023",
    color: "Blanco",
    placas: "XYZ-456-CDMX",
    servicio: "UberX",
    caracteristicas: "Buen rendimiento de combustible, interiores modernos, Bluetooth",
    flip: true,
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleInfo = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="about" className="bg-neutral-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {cars.map((car, index) => (
          <div key={index} className="relative group">
            {/* Imagen */}
            <div className="w-full max-w-full h-[250px] flex justify-center items-center border border-indigo-600 rounded-lg relative overflow-hidden bg-white">
              <Image
                src={car.src}
                alt={car.alt}
                width={400}
                height={250}
                className={`object-contain ${car.flip ? "transform -scale-x-100" : ""}`}
              />

              {/* Botón "Ver más" */}
              <button
                onClick={() => toggleInfo(index)}
                className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-4 py-1 rounded hover:bg-black/80 transition z-10"
              >
                {activeIndex === index ? "Ocultar" : "Ver más"}
              </button>

              {/* Panel deslizable */}
              <div
                className={`absolute bottom-0 left-0 w-full px-4 py-3 text-sm text-gray-900 bg-white/95 backdrop-blur-sm shadow-md transition-transform duration-700 ease-in-out ${
                  activeIndex === index ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <h2 className="font-bold text-base mb-1">Información del vehículo</h2>
                <p><strong>Marca y modelo:</strong> {car.marca}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Placas:</strong> {car.placas}</p>
                <p><strong>Servicio:</strong> {car.servicio}</p>
                <p><strong>Características:</strong> {car.caracteristicas}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}