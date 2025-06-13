"use client";

import {
  Car,
  User,
  MapPin,
  Calendar,
  CreditCard,
  MessageSquareText,
} from "lucide-react";
import { formatDate, formatTime } from "../utils/formatTime";

export default function ResumenReserva({ reserva, setEditando }) {
  return (
    <>
      <div className="space-y-4 text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
        {" "}
        {/* Tipo de servicio */}
        <div className="flex items-start gap-3">
          <Car className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Tipo de servicio</p>
            <p className="text-gray-900">{reserva.servicio}</p>
          </div>
        </div>
        {/* Pasajeros y tipo de viaje */}
        <div className="flex items-start gap-3">
          <User className="w-6 h-6 text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Pasajeros y tipo de viaje</p>
            <p>
              {reserva.personas} pasajero(s) ·{" "}
              {reserva.tipoViaje === "ida-vuelta" ? "Ida y vuelta" : "Solo ida"}
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
          {/* Fecha ida */}
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <p className="font-semibold">Fecha y hora de ida</p>
              <p className="text-gray-800">
                {formatDate(reserva.fecha)} a las {formatTime(reserva.hora)}
              </p>
            </div>
          </div>

          {/* Fecha vuelta (si aplica) */}
          {reserva.tipoViaje === "ida-vuelta" && (
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <p className="font-semibold">Fecha y hora de vuelta</p>
                <p className="text-gray-800">
                  {formatDate(reserva.fechaVuelta)} a las{" "}
                  {formatTime(reserva.horaVuelta)}
                </p>
              </div>
            </div>
          )}

          {/* Método de pago */}
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <p className="font-semibold">Método de pago</p>
              <p className="text-gray-800 capitalize">
                {reserva.metodoPago || "No especificado"}
              </p>
            </div>
          </div>
        </div>
        {/* Comentario */}
        {reserva.comentario && reserva.comentario.trim() !== "" && (
          <div className="border-t border-gray-200 pt-4 flex items-start gap-3">
            <MessageSquareText className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <p className="font-semibold">Comentario para el conductor</p>
              <p className="text-gray-800 whitespace-pre-wrap">
                {reserva.comentario}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Link editar */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setEditando(true)}
          className="text-indigo-600 hover:text-indigo-700 underline text-sm font-semibold transition"
        >
          Editar datos
        </button>
      </div>
    </>
  );
}
