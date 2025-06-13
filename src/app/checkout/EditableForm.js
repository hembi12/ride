"use client";

import PlacesAutocompleteInput from "../../components/PlacesAutocompleteInput";
import { useMemo } from "react";

export default function EditableForm({
  reserva,
  setReserva,
  setEditando,
  errores,
  onGuardar,
}) {
  const hoyStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <div className="px-4 sm:px-0 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {/* Servicio */}
        <div className="space-y-1">
          <label htmlFor="servicio" className="block text-sm font-medium text-gray-700">
            Tipo de servicio
          </label>
          <select
            id="servicio"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.servicio ? "border border-red-500" : ""
            }`}
            value={reserva.servicio}
            onChange={(e) =>
              setReserva({ ...reserva, servicio: e.target.value })
            }
          >
            <option value="" disabled>
              Selecciona servicio
            </option>
            <option value="Viaje en ciudad">Viaje en ciudad</option>
            <option value="Traslado al aeropuerto">Traslado al aeropuerto</option>
            <option value="Viaje foráneo">Viaje foráneo</option>
            <option value="Traslado VIP">Traslado VIP</option>
          </select>
          {errores.servicio && (
            <p className="text-red-500 text-sm">{errores.servicio}</p>
          )}
        </div>

        {/* Tipo de viaje */}
        <div className="space-y-1">
          <label htmlFor="tipoViaje" className="block text-sm font-medium text-gray-700">
            Tipo de viaje
          </label>
          <select
            id="tipoViaje"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.tipoViaje ? "border border-red-500" : ""
            }`}
            value={reserva.tipoViaje}
            onChange={(e) =>
              setReserva({ ...reserva, tipoViaje: e.target.value })
            }
          >
            <option value="" disabled>
              Tipo de viaje
            </option>
            <option value="ida">Solo ida</option>
            <option value="ida-vuelta">Ida y vuelta</option>
          </select>
          {errores.tipoViaje && (
            <p className="text-red-500 text-sm">{errores.tipoViaje}</p>
          )}
        </div>

        {/* Pasajeros */}
        <div className="space-y-1">
          <label htmlFor="personas" className="block text-sm font-medium text-gray-700">
            Número de pasajeros
          </label>
          <input
            id="personas"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.personas ? "border border-red-500" : ""
            }`}
            type="number"
            min={1}
            value={reserva.personas}
            onChange={(e) =>
              setReserva({ ...reserva, personas: e.target.value })
            }
          />
          {errores.personas && (
            <p className="text-red-500 text-sm">{errores.personas}</p>
          )}
        </div>

        {/* Origen */}
        <div className="space-y-1">
          <label htmlFor="origen" className="block text-sm font-medium text-gray-700">
            Origen
          </label>
          <PlacesAutocompleteInput
            id="origen"
            placeholder="Ingresa el punto de partida"
            value={reserva.origen}
            onChange={(value) => setReserva({ ...reserva, origen: value })}
          />
          {errores.origen && (
            <p className="text-red-500 text-sm">{errores.origen}</p>
          )}
        </div>

        {/* Destino */}
        <div className="space-y-1">
          <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
            Destino
          </label>
          <PlacesAutocompleteInput
            id="destino"
            placeholder="Ingresa el destino"
            value={reserva.destino}
            onChange={(value) => setReserva({ ...reserva, destino: value })}
          />
          {errores.destino && (
            <p className="text-red-500 text-sm">{errores.destino}</p>
          )}
        </div>

        {/* Fecha y hora de ida */}
        <div className="space-y-1">
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha y hora de ida
          </label>
          <input
            id="fecha"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.fecha ? "border border-red-500" : ""
            }`}
            type="date"
            min={hoyStr}
            value={reserva.fecha}
            onChange={(e) => setReserva({ ...reserva, fecha: e.target.value })}
          />
          {errores.fecha && (
            <p className="text-red-500 text-sm">{errores.fecha}</p>
          )}
          <input
            id="hora"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.hora ? "border border-red-500" : ""
            }`}
            type="time"
            value={reserva.hora}
            onChange={(e) => setReserva({ ...reserva, hora: e.target.value })}
          />
          {errores.hora && (
            <p className="text-red-500 text-sm">{errores.hora}</p>
          )}
        </div>

        {/* Fecha y hora de vuelta */}
        {reserva.tipoViaje === "ida-vuelta" && (
          <div className="space-y-1">
            <label htmlFor="fechaVuelta" className="block text-sm font-medium text-gray-700">
              Fecha y hora de vuelta
            </label>
            <input
              id="fechaVuelta"
              className={`bg-gray-100 rounded px-4 py-2 w-full ${
                errores.fechaVuelta ? "border border-red-500" : ""
              }`}
              type="date"
              min={hoyStr}
              value={reserva.fechaVuelta}
              onChange={(e) =>
                setReserva({ ...reserva, fechaVuelta: e.target.value })
              }
            />
            {errores.fechaVuelta && (
              <p className="text-red-500 text-sm">{errores.fechaVuelta}</p>
            )}
            <input
              id="horaVuelta"
              className={`bg-gray-100 rounded px-4 py-2 w-full ${
                errores.horaVuelta ? "border border-red-500" : ""
              }`}
              type="time"
              value={reserva.horaVuelta}
              onChange={(e) =>
                setReserva({ ...reserva, horaVuelta: e.target.value })
              }
            />
            {errores.horaVuelta && (
              <p className="text-red-500 text-sm">{errores.horaVuelta}</p>
            )}
          </div>
        )}

        {/* Método de pago */}
        <div className="space-y-1">
          <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">
            Método de pago
          </label>
          <select
            id="metodoPago"
            className={`bg-gray-100 rounded px-4 py-2 w-full ${
              errores.metodoPago ? "border border-red-500" : ""
            }`}
            value={reserva.metodoPago}
            onChange={(e) =>
              setReserva({ ...reserva, metodoPago: e.target.value })
            }
          >
            <option value="" disabled>
              Selecciona método de pago
            </option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="link">Link de pago</option>
          </select>
          {errores.metodoPago && (
            <p className="text-red-500 text-sm">{errores.metodoPago}</p>
          )}
        </div>

        {/* Comentario adicional */}
        <div className="space-y-1">
          <label htmlFor="comentario" className="block font-medium text-gray-700">
            Comentario para el conductor (opcional)
          </label>
          <textarea
            id="comentario"
            name="comentario"
            value={reserva.comentario}
            onChange={(e) =>
              setReserva({ ...reserva, comentario: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded bg-gray-100 text-black"
            placeholder="Ej. Llevo maletas grandes, tengo una mascota, etc."
          />
        </div>
      </div>

      {/* Botón guardar */}
      <button
        onClick={onGuardar}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        Guardar cambios
      </button>
    </div>
  );
}