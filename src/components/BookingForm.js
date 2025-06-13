"use client";

import { useMemo } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import PlacesAutocompleteInput from "./PlacesAutocompleteInput";

export default function BookingForm({
  form,
  setForm,
  errores = {},
  disponible,
  setDisponible,
  verificarDisponibilidad,
  verificando,
  handleSubmit,
}) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setDisponible(null);
  };

  const handleSelectPersonas = (e) => {
    const value = e.target.value;
    if (value === "más") {
      setForm({ ...form, personas: "", mostrarInputPasajeros: true });
    } else {
      setForm({
        ...form,
        personas: Number(value),
        mostrarInputPasajeros: false,
      });
    }
    setDisponible(null);
  };

  const handleInputPasajeros = (e) => {
    const value = Number(e.target.value);
    setForm({ ...form, personas: value });
    setDisponible(null);
  };

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md space-y-4"
    >
      {/* Tipo de viaje */}
      <div className="flex gap-4">
      <label className="block font-medium">Tipo de viaje:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoViaje"
            value="ida"
            checked={form.tipoViaje === "ida"}
            onChange={handleChange}
          />
          Solo ida
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoViaje"
            value="ida-vuelta"
            checked={form.tipoViaje === "ida-vuelta"}
            onChange={handleChange}
          />
          Ida y vuelta
        </label>
      </div>
      {errores.tipoViaje && (
        <p className="text-red-500 text-sm">{errores.tipoViaje}</p>
      )}

      {/* Número de pasajeros */}
      <div className="space-y-1">
        <select
          name="personas"
          value={form.mostrarInputPasajeros ? "más" : form.personas}
          onChange={handleSelectPersonas}
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
        >
          <option value="" disabled>
            Seleccionar número de pasajeros
          </option>
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} pasajero{i > 0 && "s"}
            </option>
          ))}
          <option value="más">Más de 7</option>
        </select>
        {form.mostrarInputPasajeros && (
          <input
            type="number"
            name="personas"
            min={8}
            placeholder="Especifica cuántos pasajeros en total"
            value={form.personas}
            onChange={handleInputPasajeros}
            required
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black mt-2"
          />
        )}
        {errores.personas && (
          <p className="text-red-500 text-sm">{errores.personas}</p>
        )}
      </div>

      {/* Tipo de servicio */}
      <div className="space-y-1">
        <select
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
        >
          <option value="" disabled>Seleccionar servicio</option>
          <option value="Viaje en ciudad">Viaje en ciudad</option>
          <option value="Traslado al aeropuerto">Traslado al aeropuerto</option>
          <option value="Viaje foráneo">Viaje foráneo</option>
          <option value="Traslado VIP">Traslado VIP</option>
        </select>
        {errores.servicio && (
          <p className="text-red-500 text-sm">{errores.servicio}</p>
        )}
      </div>

      {/* Origen */}
      <div className="space-y-1">
        
        <label className="block font-medium">Origen:</label>
        <PlacesAutocompleteInput
          placeholder="Desde donde sales"
          value={form.origen}
          onChange={(value) => setForm({ ...form, origen: value })}
        />
        {errores.origen && (
          <p className="text-red-500 text-sm">{errores.origen}</p>
        )}
      </div>

      {/* Destino */}
      <div className="space-y-1">
        <label className="block font-medium">Destino:</label>
        <PlacesAutocompleteInput
          placeholder="Hacia donde vas"
          value={form.destino}
          onChange={(value) => setForm({ ...form, destino: value })}
        />
        {errores.destino && (
          <p className="text-red-500 text-sm">{errores.destino}</p>
        )}
      </div>

      {/* Fecha y hora de ida */}
      <div className="space-y-2">
        <label className="block font-medium">Fecha de inicio del viaje:</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
          min={todayStr}
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
        />
        {errores.fecha && (
          <p className="text-red-500 text-sm">{errores.fecha}</p>
        )}

        <label className="block font-medium">Hora de inicio del viaje:</label>
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
        />
        {errores.hora && <p className="text-red-500 text-sm">{errores.hora}</p>}
      </div>

      {/* Fecha y hora de vuelta */}
      {form.tipoViaje === "ida-vuelta" && (
        <div className="space-y-2">
          <label className="block font-medium">Fecha de fin del viaje</label>
          <input
            type="date"
            name="fechaVuelta"
            value={form.fechaVuelta || ""}
            onChange={handleChange}
            required
            min={form.fecha || todayStr}
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
          />
          {errores.fechaVuelta && (
            <p className="text-red-500 text-sm">{errores.fechaVuelta}</p>
          )}

          <label className="block font-medium">Hora de fin del viaje</label>
          <input
            type="time"
            name="horaVuelta"
            value={form.horaVuelta || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
          />
          {errores.horaVuelta && (
            <p className="text-red-500 text-sm">{errores.horaVuelta}</p>
          )}
        </div>
      )}

      {/* Método de pago */}
      <div className="space-y-1">
        <select
          name="metodoPago"
          value={form.metodoPago || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
          required
        >
          <option value="" disabled>Selecciona un método de pago</option>
          <option value="tarjeta">Tarjeta de crédito/débito</option>
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
        <label className="block font-medium">Comentario para el conductor (opcional)</label>
        <textarea
          name="comentario"
          value={form.comentario || ""}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 text-black"
          placeholder="Ej. Llevo maletas grandes, tengo una mascota, etc."
        />
      </div>

      {/* Resultado de verificación */}
      {disponible === true && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded text-sm">
          <CheckCircle className="w-10 h-10 text-green-600" />
          <span>
            ¡Disponible! El conductor puede realizar el viaje en la fecha solicitada.
          </span>
        </div>
      )}

      {disponible === false && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded text-sm">
          <XCircle className="w-10 h-10 text-red-600" />
          <span>
            Lo sentimos, no hay disponibilidad para la fecha seleccionada. Intenta con otro horario o día.
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={verificarDisponibilidad}
        disabled={verificando}
        className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition ${
          verificando ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {verificando && <Loader2 className="w-5 h-5 animate-spin" />}
        {verificando ? "Verificando..." : "Verificar disponibilidad"}
      </button>
    </form>
  );
}
