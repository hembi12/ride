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
    comentario: "", // nuevo campo agregado
    mostrarInputPasajeros: false,
  });

  const [errores, setErrores] = useState({});
  const [disponible, setDisponible] = useState(null);
  const [verificando, setVerificando] = useState(false);
  const fechasNoDisponibles = ["2025-06-12", "2025-06-15", "2025-06-18"];

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
        metodoPago: searchParams.get("metodoPago") || "",
        comentario: searchParams.get("comentario") || "",
        mostrarInputPasajeros:
          Number(searchParams.get("personas")) > 7 || false,
      }));
    }
  }, [searchParams]);

  const validarFormulario = () => {
    const nuevosErrores = {};
    const hoyStr = new Date().toISOString().split("T")[0];

    if (!form.tipoViaje)
      nuevosErrores.tipoViaje = "Selecciona el tipo de viaje";
    if (!form.personas || Number(form.personas) < 1)
      nuevosErrores.personas = "Indica cuántas personas viajan";
    if (!form.servicio) nuevosErrores.servicio = "Selecciona un servicio";
    if (!form.origen) nuevosErrores.origen = "Ingresa el origen del viaje";
    if (!form.destino) nuevosErrores.destino = "Ingresa el destino del viaje";
    if (!form.fecha) nuevosErrores.fecha = "Selecciona la fecha del viaje";
    if (!form.hora) nuevosErrores.hora = "Selecciona la hora del viaje";
    if (!form.metodoPago)
      nuevosErrores.metodoPago = "Selecciona un método de pago";

    if (form.fecha) {
      if (form.fecha < hoyStr) {
        nuevosErrores.fecha = "La fecha no puede ser en el pasado";
      } else if (form.fecha === hoyStr && form.hora) {
        const [hSel, mSel] = form.hora.split(":").map(Number);
        const ahora = new Date();
        const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();
        const minutosSeleccionados = hSel * 60 + mSel;

        if (minutosSeleccionados < minutosActuales) {
          nuevosErrores.hora = "La hora debe ser posterior a la hora actual";
        }
      }
    }

    if (form.tipoViaje === "ida-vuelta") {
      if (!form.fechaVuelta)
        nuevosErrores.fechaVuelta = "Selecciona la fecha de regreso";
      if (!form.horaVuelta)
        nuevosErrores.horaVuelta = "Selecciona la hora de regreso";

      if (form.fechaVuelta && form.fecha && form.fechaVuelta < form.fecha) {
        nuevosErrores.fechaVuelta =
          "La fecha de regreso debe ser posterior a la de ida";
      }

      if (form.fechaVuelta && form.horaVuelta) {
        const [h2, m2] = form.horaVuelta.split(":");
        const horaVuelta = new Date(`${form.fechaVuelta}T${h2.padStart(2, "0")}:${m2.padStart(2, "0")}`);
        const ahora = new Date();

        if (
          form.fechaVuelta === hoyStr &&
          horaVuelta.getTime() < ahora.getTime()
        ) {
          nuevosErrores.horaVuelta =
            "La hora de regreso no puede ser en el pasado";
        }

        if (form.fecha === form.fechaVuelta && form.hora) {
          const [h1, m1] = form.hora.split(":");
          const horaIda = new Date(`${form.fechaVuelta}T${h1.padStart(2, "0")}:${m1.padStart(2, "0")}`);

          if (horaVuelta.getTime() <= horaIda.getTime()) {
            nuevosErrores.horaVuelta =
              "La hora de regreso debe ser posterior a la hora de ida";
          }
        }
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const verificarDisponibilidad = () => {
    if (!validarFormulario()) return;

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
          comentario: form.comentario || "",
        }).toString();

        window.location.href = `/checkout?${queryParams}`;
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          errores={errores}
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
