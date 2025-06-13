"use client";

import Image from "next/image";
import { useState } from "react";

const cars = [
  {
    src: "/auto.png",
    alt: "Vehículo 1",
    marca: "Suzuki Ertiga 2022",
    color: "Gris Oxford",
    caracteristicas:
      "Aire acondicionado, asientos cómodos, espacio para equipaje, Bluetooth",
    flip: false,
  },
  {
    src: "/auto2.png",
    alt: "Vehículo 2",
    marca: "Suzuki Ertiga 2019",
    color: "Blanco",
    caracteristicas:
      "Aire acondicionado, asientos cómodos, espacio para equipaje, Bluetooth",
    flip: true,
  },
];

export default function About() {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const toggleInfo = () => {
    setMostrarInfo((prev) => !prev);
  };

  return (
    <section id="about" className="bg-neutral-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Vehículos disponibles para tu traslado
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-indigo-200 overflow-hidden"
            >
              {/* Imagen */}
              <div className="w-full h-[250px] flex justify-center items-center relative">
                <Image
                  src={car.src}
                  alt={car.alt}
                  width={400}
                  height={250}
                  className={`object-contain ${
                    car.flip ? "transform -scale-x-100" : ""
                  }`}
                />
                <button
                  onClick={toggleInfo}
                  className="absolute bottom-3 right-3 bg-indigo-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-indigo-700 transition z-10"
                >
                  {mostrarInfo ? "Ocultar" : "Ver más"}
                </button>
              </div>

              {/* Panel informativo */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  mostrarInfo ? "max-h-[500px] p-4" : "max-h-0 p-0"
                }`}
              >
                {mostrarInfo && (
                  <div className="text-sm text-gray-800 space-y-1">
                    <p>
                      <strong>Marca y modelo:</strong> {car.marca}
                    </p>
                    <p>
                      <strong>Color:</strong> {car.color}
                    </p>
                    <p>
                      <strong>Límite de pasajeros:</strong> 7
                    </p>
                    <p>
                      <strong>Características:</strong> {car.caracteristicas}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
