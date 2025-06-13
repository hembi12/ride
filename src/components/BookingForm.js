"use client";

import PlacesAutocompleteInput from "./PlacesAutocompleteInput";

export default function BookingForm({
  form,
  setForm,
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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md space-y-4"
    >
      {/* Tipo de viaje */}
      <div className="flex gap-4">
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

      {/* Número de pasajeros */}
      <div className="space-y-1">
        <select
          name="personas"
          value={form.mostrarInputPasajeros ? "más" : form.personas}
          onChange={handleSelectPersonas}
          className="w-full px-4 py-2 rounded bg-gray-100 text-black"
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
            className="w-full px-4 py-2 rounded bg-gray-100 text-black mt-2"
          />
        )}
      </div>

      {/* Tipo de servicio */}
      <select
        name="servicio"
        value={form.servicio}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-gray-100 text-black"
      >
        <option value="">Seleccionar servicio</option>
        <option value="Viaje en ciudad">Viaje en ciudad</option>
        <option value="Traslado al aeropuerto">Traslado al aeropuerto</option>
        <option value="Viaje foráneo">Viaje foráneo</option>
        <option value="Traslado VIP">Traslado VIP</option>
      </select>

      {/* Origen */}
      <div className="space-y-1">
        <label className="block font-medium">Origen</label>
        <PlacesAutocompleteInput
          placeholder="Desde donde sales"
          value={form.origen}
          onChange={(value) => setForm({ ...form, origen: value })}
        />
      </div>

      {/* Destino */}
      <div className="space-y-1">
        <label className="block font-medium">Destino</label>
        <PlacesAutocompleteInput
          placeholder="Hacia donde vas"
          value={form.destino}
          onChange={(value) => setForm({ ...form, destino: value })}
        />
      </div>

      {/* Fecha y hora de ida */}
      <div className="space-y-2">
        <label className="block font-medium">Fecha de inicio del viaje</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-100 text-black"
        />

        <label className="block font-medium">Hora de inicio del viaje</label>
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-gray-100 text-black"
        />
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
            className="w-full px-4 py-2 rounded bg-gray-100 text-black"
          />

          <label className="block font-medium">Hora de fin del viaje</label>
          <input
            type="time"
            name="horaVuelta"
            value={form.horaVuelta || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-gray-100 text-black"
          />
        </div>
      )}

      {/* Método de pago */}
      <div className="space-y-1">
        <label className="block font-medium">Método de pago</label>
        <select
          name="metodoPago"
          value={form.metodoPago || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 text-black"
          required
        >
          <option value="">Selecciona un método de pago</option>
          <option value="tarjeta">Tarjeta de crédito/débito</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia bancaria</option>
          <option value="link">Link de pago</option>
        </select>
      </div>

      {/* Resultado de verificación y acción */}
      {disponible === false && (
        <p className="text-red-600 font-medium text-center">
          No hay disponibilidad en esa fecha.
        </p>
      )}

      <button
        type="button"
        onClick={verificarDisponibilidad}
        disabled={verificando}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
      >
        {verificando ? "Verificando..." : "Verificar disponibilidad"}
      </button>
    </form>
  );
}
