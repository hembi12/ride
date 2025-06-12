"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  User,
  Car,
  Pencil,
  Save,
} from "lucide-react";

export default function CheckoutPage() {
  const params = useSearchParams();

  const [editando, setEditando] = useState(false);
  const [reserva, setReserva] = useState({
    tipoViaje: "",
    servicio: "",
    origen: "",
    destino: "",
    personas: "",
    fecha: "",
    hora: "",
    fechaVuelta: "",
    horaVuelta: "",
  });

  // Inicializar datos desde la URL
  useEffect(() => {
    setReserva({
      tipoViaje: params.get("tipoViaje") || "",
      servicio: params.get("servicio") || "",
      origen: params.get("origen") || "",
      destino: params.get("destino") || "",
      personas: params.get("personas") || "",
      fecha: params.get("fecha") || "",
      hora: params.get("hora") || "",
      fechaVuelta: params.get("fechaVuelta") || "",
      horaVuelta: params.get("horaVuelta") || "",
    });
  }, [params]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const formatTime = (time24) => {
    if (!time24) return "";
    const [h, m] = time24.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1;
    return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
  };

  return (
    <section className="min-h-screen bg-neutral-100 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Confirmación de Reservación
        </h2>
        <p className="text-gray-500">
          {editando ? "Edita los campos necesarios" : "Revisa los detalles antes de confirmar"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-6">
        {editando ? (
          <>
            {/* Formulario editable */}
            <div className="grid grid-cols-1 gap-4">
              <input
                className="bg-gray-100 rounded px-4 py-2"
                type="text"
                placeholder="Origen"
                value={reserva.origen}
                onChange={(e) => setReserva({ ...reserva, origen: e.target.value })}
              />
              <input
                className="bg-gray-100 rounded px-4 py-2"
                type="text"
                placeholder="Destino"
                value={reserva.destino}
                onChange={(e) => setReserva({ ...reserva, destino: e.target.value })}
              />
              <select
                className="bg-gray-100 rounded px-4 py-2"
                value={reserva.tipoViaje}
                onChange={(e) => setReserva({ ...reserva, tipoViaje: e.target.value })}
              >
                <option value="">Tipo de viaje</option>
                <option value="ida">Solo ida</option>
                <option value="ida-vuelta">Ida y vuelta</option>
              </select>
              <input
                className="bg-gray-100 rounded px-4 py-2"
                type="number"
                placeholder="Pasajeros"
                min={1}
                value={reserva.personas}
                onChange={(e) => setReserva({ ...reserva, personas: e.target.value })}
              />
              <select
                className="bg-gray-100 rounded px-4 py-2"
                value={reserva.servicio}
                onChange={(e) => setReserva({ ...reserva, servicio: e.target.value })}
              >
                <option value="">Selecciona servicio</option>
                <option value="Viaje en ciudad">Viaje en ciudad</option>
                <option value="Traslado al aeropuerto">Traslado al aeropuerto</option>
                <option value="Viaje foráneo">Viaje foráneo</option>
                <option value="Traslado VIP">Traslado VIP</option>
              </select>
              <input
                className="bg-gray-100 rounded px-4 py-2"
                type="date"
                value={reserva.fecha}
                onChange={(e) => setReserva({ ...reserva, fecha: e.target.value })}
              />
              <input
                className="bg-gray-100 rounded px-4 py-2"
                type="time"
                value={reserva.hora}
                onChange={(e) => setReserva({ ...reserva, hora: e.target.value })}
              />
              {reserva.tipoViaje === "ida-vuelta" && (
                <>
                  <input
                    className="bg-gray-100 rounded px-4 py-2"
                    type="date"
                    value={reserva.fechaVuelta}
                    onChange={(e) => setReserva({ ...reserva, fechaVuelta: e.target.value })}
                  />
                  <input
                    className="bg-gray-100 rounded px-4 py-2"
                    type="time"
                    value={reserva.horaVuelta}
                    onChange={(e) => setReserva({ ...reserva, horaVuelta: e.target.value })}
                  />
                </>
              )}
            </div>
            <button
              onClick={() => setEditando(false)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Guardar cambios
            </button>
          </>
        ) : (
          <>
            {/* Vista resumen */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Car className="w-5 h-5 text-indigo-500" />
                Tipo de servicio:{" "}
                <span className="font-normal text-gray-900">{reserva.servicio}</span>
              </h3>
              <p className="flex items-center gap-2 text-gray-600">
                <User className="w-5 h-5 text-indigo-500" />
                {reserva.personas} pasajero(s) · {reserva.tipoViaje}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-indigo-500" />
                De: <span className="font-medium text-gray-800">{reserva.origen}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-indigo-500" />
                A: <span className="font-medium text-gray-800">{reserva.destino}</span>
              </p>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Ida:{" "}
                  <span className="text-gray-800 font-medium">
                    {reserva.fecha} a las {formatTime(reserva.hora)}
                  </span>
                </p>
                {reserva.tipoViaje === "ida-vuelta" && (
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    Vuelta:{" "}
                    <span className="text-gray-800 font-medium">
                      {reserva.fechaVuelta} a las {formatTime(reserva.horaVuelta)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Botones */}
            <button
              onClick={() => setEditando(true)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              <Pencil className="w-5 h-5" /> Editar datos
            </button>
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
              onClick={() => alert("Reserva confirmada. ¡Gracias!")}
            >
              Confirmar reservación
            </button>
          </>
        )}

        {/* Mapa */}
        {reserva.origen && reserva.destino && apiKey && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Recorrido sugerido
            </h3>
            <div className="w-full h-80 overflow-hidden rounded-xl shadow-md border">
              <iframe
                title="Ruta en Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(
                  reserva.origen
                )}&destination=${encodeURIComponent(reserva.destino)}`}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}