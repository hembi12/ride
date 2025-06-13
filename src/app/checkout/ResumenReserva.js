"use client";
import { Car, User, MapPin, Calendar, CreditCard, Pencil } from "lucide-react";
import { formatTime, formatDate } from "../utils/formatTime";

export default function ResumenReserva({ reserva, formatTime, setEditando }) {
  return (
    <>
      <div className="space-y-4 text-sm sm:text-base text-gray-700">
        {/* Servicio */}
        <div className="flex items-start gap-3">
          <Car className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Tipo de servicio</p>
            <p className="text-gray-900">{reserva.servicio}</p>
          </div>
        </div>

        {/* Pasajeros y tipo */}
        <div className="flex items-start gap-3">
          <User className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Pasajeros y tipo de viaje</p>
            <p>
              {reserva.personas} pasajero(s) · {reserva.tipoViaje}
            </p>
          </div>
        </div>

        {/* Origen */}
        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Origen</p>
            <p className="text-gray-800">{reserva.origen}</p>
          </div>
        </div>

        {/* Destino */}
        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Destino</p>
            <p className="text-gray-800">{reserva.destino}</p>
          </div>
        </div>

        {/* Fechas */}
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <p className="font-semibold">Fecha y hora de ida</p>
              <p className="text-gray-800">
                {formatDate(reserva.fecha)} a las {formatTime(reserva.hora)}
              </p>{" "}
            </div>
          </div>

          {reserva.tipoViaje === "ida-vuelta" && (
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <p className="font-semibold">Fecha y hora de vuelta</p>
                <p className="text-gray-800">
                  {formatDate(reserva.fechaVuelta)} a las{" "}
                  {formatTime(reserva.horaVuelta)}
                </p>{" "}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <p className="font-semibold">Método de pago</p>
              <p className="text-gray-800 capitalize">{reserva.metodoPago}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {/* Botón principal de acción */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          onClick={() => alert("Reserva confirmada. ¡Gracias!")}
        >
          Confirmar reservación
        </button>

        {/* Botón secundario (menos llamativo) */}
        <button
          onClick={() => setEditando(true)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
        >
          <Pencil className="w-4 h-4" /> Editar datos
        </button>
      </div>
    </>
  );
}
