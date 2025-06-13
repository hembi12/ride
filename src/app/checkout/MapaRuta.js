"use client";

export default function MapaRuta({ origen, destino, apiKey }) {
  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Recorrido sugerido
      </h3>
      {/* Texto aclaratorio */}
      <p className="text-sm text-gray-500 mt-2 text-left">
        Este recorrido es solo una referencia visual generada automáticamente
        con base en la ubicación de origen y destino proporcionados. La ruta
        real puede variar dependiendo del tráfico, condiciones del camino u
        otras circunstancias al momento del viaje.
      </p>
      <div className="mt-5 w-full h-80 overflow-hidden rounded-xl shadow-md border">
        <iframe
          title="Ruta en Google Maps"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(
            origen
          )}&destination=${encodeURIComponent(destino)}`}
        ></iframe>
      </div>
    </div>
  );
}
