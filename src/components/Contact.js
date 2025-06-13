"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative py-20 px-6 bg-fixed bg-center bg-cover bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bike.jpg')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Contenido */}
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contacto directo</h2>
        <p className="w-fit max-w-xs sm:max-w-md mx-auto text-neutral-300 p-2 bg-black/30 backdrop-blur-md rounded-xl font-medium mb-8">
          ¿Tienes dudas o prefieres reservar por mensaje? Contáctame
          directamente por WhatsApp.
        </p>
        <div className="flex justify-center">
          <a
            href="https://wa.me/5215512345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaWhatsapp className="w-5 h-5" />
            Enviar WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
