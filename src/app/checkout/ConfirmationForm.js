"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function ConfirmationForm() {
  const [form, setForm] = useState({
    medioContacto: "ambos",
    nombre: "",
    telefono: "",
    correo: "",
    aceptaPolitica: false,
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};

    if (!form.medioContacto)
      nuevosErrores.medioContacto = "Selecciona cómo deseas ser contactado.";
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";

    if (
      (form.medioContacto === "whatsapp" || form.medioContacto === "ambos") &&
      !form.telefono.trim()
    ) {
      nuevosErrores.telefono = "El número de WhatsApp es obligatorio.";
    }

    if (
      (form.medioContacto === "email" || form.medioContacto === "ambos") &&
      !form.correo.trim()
    ) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (
      form.correo.trim() &&
      (form.medioContacto === "email" || form.medioContacto === "ambos") &&
      !validarCorreo(form.correo)
    ) {
      nuevosErrores.correo = "El correo no es válido.";
    }

    if (!form.aceptaPolitica) {
      nuevosErrores.aceptaPolitica = "Debes aceptar la política de privacidad.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setEnviando(true);

    setTimeout(() => {
      setEnviando(false);
      setExito(true);
      setForm({
        medioContacto: "ambos",
        nombre: "",
        telefono: "",
        correo: "",
        aceptaPolitica: false,
      });
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-4 max-w-2xl mx-auto space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Confirma tus datos de contacto
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Usamos tus datos para organizar tu traslado de forma segura y sin
        contratiempos.
      </p>

      <div className="space-y-4">
        {/* Medio de contacto - SELECT */}
        <div>
          <label className="block text-sm font-medium mb-1">
            ¿Cómo prefieres recibir tu confirmación?
          </label>
          <select
            name="medioContacto"
            value={form.medioContacto}
            onChange={handleChange}
            className="w-full bg-neutral-100 border border-gray-300 rounded px-3 py-2 text-neutral-500"
          >
            <option value="ambos">Email y WhatsApp</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          {errores.medioContacto && (
            <p className="text-red-600 text-sm">{errores.medioContacto}</p>
          )}
        </div>

        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full bg-neutral-100 border border-gray-300 rounded px-4 py-2"
        />
        {errores.nombre && (
          <p className="text-red-600 text-sm">{errores.nombre}</p>
        )}

        {/* Teléfono */}
        {(form.medioContacto === "whatsapp" ||
          form.medioContacto === "ambos") && (
          <>
            <input
              type="tel"
              name="telefono"
              placeholder="Número de WhatsApp"
              value={form.telefono}
              onChange={handleChange}
              className="w-full bg-neutral-100 border border-gray-300 rounded px-4 py-2"
            />
            {errores.telefono && (
              <p className="text-red-600 text-sm">{errores.telefono}</p>
            )}
          </>
        )}

        {/* Correo */}
        {(form.medioContacto === "email" || form.medioContacto === "ambos") && (
          <>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              className="w-full bg-neutral-100 border border-gray-300 rounded px-4 py-2"
            />
            {errores.correo && (
              <p className="text-red-600 text-sm">{errores.correo}</p>
            )}
          </>
        )}

        {/* Checkbox política */}
        <label className="flex items-start text-sm text-gray-600">
          <input
            type="checkbox"
            name="aceptaPolitica"
            checked={form.aceptaPolitica}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          <span>
            Acepto la{" "}
            <a
              href="/politica-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              política de privacidad
            </a>{" "}
            y entiendo que estos datos se usan exclusivamente para coordinar el
            traslado.
          </span>
        </label>
        {errores.aceptaPolitica && (
          <p className="text-red-600 text-sm">{errores.aceptaPolitica}</p>
        )}

        {/* Éxito */}
        {exito && (
          <div className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded text-sm">
            <CheckCircle className="w-5 h-5 text-green-700" />
            <span>Formulario enviado correctamente.</span>
          </div>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={enviando}
        className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition ${
          enviando ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {enviando && <Loader2 className="w-5 h-5 animate-spin" />}
        {enviando ? "Enviando..." : "Enviar confirmación"}
      </button>
    </form>
  );
}
