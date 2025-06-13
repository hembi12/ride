"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
    fechaVuelta: "",
    horaVuelta: "",
    origen: "",
    destino: "",
    servicio: "",
    tipoViaje: "ida",
    personas: "",
    metodoPago: "",
    mostrarInputPasajeros: false,
  });

  const [disponible, setDisponible] = useState(null);
  const [verificando, setVerificando] = useState(false);

  const fechasNoDisponibles = ["2025-06-12", "2025-06-15", "2025-06-18"];

  // Prellenar datos desde URL (para ediciones desde checkout)
  useEffect(() => {
    if (searchParams.size > 0) {
      setForm((prev) => ({
        ...prev,
        tipoViaje: searchParams.get("tipoViaje") || "ida",
        servicio: searchParams.get("servicio") || "",
        origen: searchParams.get("origen") || "",
        destino: searchParams.get("destino") || "",
        personas: searchParams.get("personas") || "",
        fecha: searchParams.get("fecha") || "",
        hora: searchParams.get("hora") || "",
        fechaVuelta: searchParams.get("fechaVuelta") || "",
        horaVuelta: searchParams.get("horaVuelta") || "",
        mostrarInputPasajeros:
          Number(searchParams.get("personas")) > 7 || false,
      }));
    }
  }, [searchParams]);

  const verificarDisponibilidad = () => {
    setVerificando(true);
    setTimeout(() => {
      const noDisponible = fechasNoDisponibles.includes(form.fecha);
      const esDisponible = !noDisponible;
      setDisponible(esDisponible);
      setVerificando(false);

      if (esDisponible) {
        const queryParams = new URLSearchParams({
          tipoViaje: form.tipoViaje,
          personas: form.personas.toString(),
          servicio: form.servicio,
          origen: form.origen,
          destino: form.destino,
          fecha: form.fecha,
          hora: form.hora,
          fechaVuelta: form.fechaVuelta || "",
          horaVuelta: form.horaVuelta || "",
          metodoPago: form.metodoPago || "",
        }).toString();

        window.location.href = `/checkout?${queryParams}`;
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Este formulario ya no envía directamente. Usa verificar disponibilidad."
    );
  };

  return (
    <section id="reserva" className="py-20 px-6 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Solicitud de viaje</h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed max-w-prose mx-auto">
          Para poder confirmar tu reservación, primero debemos revisar la
          disponibilidad enviando los detalles de tu viaje al conductor.
        </p>
      </div>
      <div className="max-w-5xl mx-auto flex justify-center">
        <BookingForm
          form={form}
          setForm={setForm}
          disponible={disponible}
          setDisponible={setDisponible}
          verificarDisponibilidad={verificarDisponibilidad}
          verificando={verificando}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
