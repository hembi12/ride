"use client";
import { Save } from "lucide-react";
import PlacesAutocompleteInput from "../../components/PlacesAutocompleteInput"; // ajusta la ruta si es necesario

export default function EditableForm({ reserva, setReserva, setEditando }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Campo: Origen con Autocomplete */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Origen</label>
          <PlacesAutocompleteInput
            placeholder="Ingresa el punto de partida"
            value={reserva.origen}
            onChange={(value) => setReserva({ ...reserva, origen: value })}
          />
        </div>

        {/* Campo: Destino con Autocomplete */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Destino</label>
          <PlacesAutocompleteInput
            placeholder="Ingresa el destino"
            value={reserva.destino}
            onChange={(value) => setReserva({ ...reserva, destino: value })}
          />
        </div>

        {/* Tipo de viaje */}
        <select
          className="bg-gray-100 rounded px-4 py-2"
          value={reserva.tipoViaje}
          onChange={(e) => setReserva({ ...reserva, tipoViaje: e.target.value })}
        >
          <option value="">Tipo de viaje</option>
          <option value="ida">Solo ida</option>
          <option value="ida-vuelta">Ida y vuelta</option>
        </select>

        {/* Pasajeros */}
        <input
          className="bg-gray-100 rounded px-4 py-2"
          type="number"
          placeholder="Pasajeros"
          min={1}
          value={reserva.personas}
          onChange={(e) => setReserva({ ...reserva, personas: e.target.value })}
        />

        {/* Servicio */}
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

        {/* Fecha y hora de ida */}
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

        {/* Fecha y hora de vuelta */}
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

        {/* Método de pago */}
        <select
          className="bg-gray-100 rounded px-4 py-2"
          value={reserva.metodoPago}
          onChange={(e) => setReserva({ ...reserva, metodoPago: e.target.value })}
        >
          <option value="">Selecciona método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia bancaria</option>
          <option value="link">Link de pago</option>
        </select>
      </div>

      {/* Botón guardar */}
      <button
        onClick={() => setEditando(false)}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" /> Guardar cambios
      </button>
    </>
  );
}