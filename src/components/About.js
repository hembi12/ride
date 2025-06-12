"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-neutral-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Columna izquierda: foto del vehículo */}
        <div className="flex justify-center">
          <Image
            src="/auto.png" // Reemplaza con la ruta real de la imagen del vehículo
            alt="Foto del vehículo"
            width={400}
            height={250}
            className="rounded-lg shadow-lg object-cover border border-indigo-600"
          />
        </div>

        {/* Columna derecha: info */}
        <div className="text-left space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Información del vehículo</h2>
          <p><strong>Marca y modelo:</strong> Nissan Versa 2022</p>
          <p><strong>Color:</strong> Gris Oxford</p>
          <p><strong>Placas:</strong> ABC-123-CDMX</p>
          <p><strong>Servicio:</strong> Uber Comfort</p>
          <p><strong>Características:</strong> Aire acondicionado, asientos cómodos, espacio para equipaje</p>
        </div>

      </div>
    </section>
  );
}