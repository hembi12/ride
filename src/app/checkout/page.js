"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import EditableForm from "./EditableForm";
import ResumenReserva from "./ResumenReserva";
import MapaRuta from "./MapaRuta";
import { formatTime } from "../utils/formatTime";

export default function CheckoutPage() {
  const params = useSearchParams();
  const [editando, setEditando] = useState(false);
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
    });
  }, [params]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <section className="min-h-screen bg-neutral-100 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Confirmación de Reservación
        </h2>
        <p className="text-gray-500">
          {editando
            ? "Edita los campos necesarios"
            : "Revisa los detalles antes de confirmar"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto space-y-6">
      {reserva.origen && reserva.destino && apiKey && (
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
          />
        ) : (
          <ResumenReserva
            reserva={reserva}
            formatTime={formatTime}
            setEditando={setEditando}
          />
        )}
      </div>
    </section>
  );
}
