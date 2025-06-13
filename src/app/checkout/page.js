"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import EditableForm from "./EditableForm";
import ResumenReserva from "./ResumenReserva";
import MapaRuta from "./MapaRuta";
import ConfirmationForm from "./ConfirmationForm";
import { formatTime } from "../utils/formatTime";

export default function CheckoutPage() {
  const params = useSearchParams();
  const [editando, setEditando] = useState(false);
  const [errores, setErrores] = useState({});
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
    metodoPago: "",
    comentario: "",
  });

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
      metodoPago: params.get("metodoPago") || "",
      comentario: params.get("comentario") || "",
    });
  }, [params]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const datosValidos = () => {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split("T")[0];
    const horaActual = hoy.toTimeString().slice(0, 5);
    const erroresTemp = {};

    if (!reserva.tipoViaje)
      erroresTemp.tipoViaje = "Selecciona el tipo de viaje";
    if (!reserva.servicio) erroresTemp.servicio = "Selecciona un servicio";
    if (!reserva.origen) erroresTemp.origen = "Ingresa el origen";
    if (!reserva.destino) erroresTemp.destino = "Ingresa el destino";
    if (!reserva.personas || Number(reserva.personas) < 1)
      erroresTemp.personas = "Número de pasajeros inválido";
    if (!reserva.fecha) erroresTemp.fecha = "Selecciona la fecha";
    if (!reserva.hora) erroresTemp.hora = "Selecciona la hora";
    if (!reserva.metodoPago)
      erroresTemp.metodoPago = "Selecciona un método de pago";

    if (reserva.fecha < hoyStr)
      erroresTemp.fecha = "La fecha no puede ser en el pasado";

    if (reserva.fecha === hoyStr) {
      const [hSel, mSel] = reserva.hora.split(":").map(Number);
      const [hAct, mAct] = horaActual.split(":").map(Number);
      const minutosSel = hSel * 60 + mSel;
      const minutosAct = hAct * 60 + mAct;
      if (minutosSel < minutosAct)
        erroresTemp.hora = "La hora no puede ser anterior a la actual";
    }

    if (reserva.tipoViaje === "ida-vuelta") {
      if (!reserva.fechaVuelta)
        erroresTemp.fechaVuelta = "Selecciona la fecha de vuelta";
      if (!reserva.horaVuelta)
        erroresTemp.horaVuelta = "Selecciona la hora de vuelta";
      if (reserva.fechaVuelta < reserva.fecha)
        erroresTemp.fechaVuelta =
          "La fecha de vuelta no puede ser antes que la de ida";
      if (
        reserva.fecha === reserva.fechaVuelta &&
        reserva.horaVuelta <= reserva.hora
      ) {
        erroresTemp.horaVuelta =
          "La hora de vuelta debe ser posterior a la de ida";
      }
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleGuardar = () => {
    if (datosValidos()) {
      setEditando(false);
    } else {
      setEditando(true);
    }
  };

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 text-white bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: "url('/guanajuato.jpg')" }}
    >
      {/* Capa oscura de fondo */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Contenido */}
      <div className="relative z-10">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Detalles del viaje
          </h2>
          <p className="w-fit mx-auto text-neutral-200 p-2 bg-black/30 backdrop-blur-md rounded-xl font-medium mb-8">
            {editando
              ? "Edita los campos necesarios"
              : "Revisa los detalles antes de confirmar"}
          </p>
        </header>

        <div className="bg-neutral-100 text-black rounded-2xl shadow-lg p-4 max-w-2xl mx-auto space-y-6">
          {editando && Object.keys(errores).length > 0 && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded text-sm">
              Por favor corrige los campos marcados antes de continuar.
            </div>
          )}

          {reserva.origen?.trim().length > 3 &&
            reserva.destino?.trim().length > 3 &&
            apiKey && (
              <MapaRuta
                origen={reserva.origen}
                destino={reserva.destino}
                apiKey={apiKey}
              />
            )}

          {editando ? (
            <EditableForm
              reserva={reserva}
              setReserva={setReserva}
              setEditando={setEditando}
              errores={errores}
              onGuardar={handleGuardar}
            />
          ) : (
            <ResumenReserva
              reserva={reserva}
              formatTime={formatTime}
              setEditando={() => setEditando(true)}
            />
          )}
        </div>

        {!editando && (
          <div className="mt-10">
            <ConfirmationForm />
          </div>
        )}
      </div>
    </section>
  );
}
