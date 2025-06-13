"use client";
import { CreditCard, Wallet, Banknote, Link } from "lucide-react";
import Image from "next/image";

export default function PaymentMethods() {
  return (
    <section
      id="paymentmethods"
      className="relative py-20 px-6 bg-fixed bg-center bg-cover bg-no-repeat text-white"
      style={{ backgroundImage: "url('/palace.jpg')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 max-w-3xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold">Métodos de pago</h2>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap justify-center items-stretch gap-6 max-w-6xl mx-auto">
        {/* Tarjeta */}
        <div className="flex-1 min-w-[250px] bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
          <CreditCard className="w-10 h-10 mb-3 text-indigo-400" />
          <h3 className="text-xl font-semibold mb-1">Tarjeta</h3>
          <p className="text-sm text-neutral-300">Crédito o débito</p>
          <p className="text-xs text-green-400 mt-2">
            Pago 100% seguro con terminal mercado pago.
          </p>
        </div>

        {/* Transferencia */}
        <div className="flex-1 min-w-[250px] bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
          <Banknote className="w-10 h-10 mb-3 text-green-400" />
          <h3 className="text-xl font-semibold mb-1">Transferencia</h3>
          <p className="text-sm text-neutral-300">Bancaria directa</p>
          <p className="text-xs text-green-400 mt-2">
            Datos verificados y confirmación inmediata.
          </p>
        </div>

        {/* Efectivo */}
        <div className="flex-1 min-w-[250px] bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
          <Wallet className="w-10 h-10 mb-3 text-amber-400" />
          <h3 className="text-xl font-semibold mb-1">Efectivo</h3>
          <p className="text-sm text-neutral-300">Pago al abordar</p>
          <p className="text-xs text-green-400 mt-2">
            Sin comisiones ni cargos adicionales.
          </p>
        </div>

        {/* Link de pago */}
        <div className="flex-1 min-w-[250px] bg-black/30 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
          <Link className="w-10 h-10 mb-3 text-cyan-400" />
          <h3 className="text-xl font-semibold mb-1">Link de pago</h3>
          <p className="text-sm text-neutral-300">Paga desde tu celular</p>
          <p className="text-xs text-green-400 mt-2">
            Enlace directo a pasarela segura.
          </p>
        </div>
      </div>

      {/* Logos de pago aceptado */}
      <div className="relative z-10 mt-6 flex justify-center gap-6">
        <Image src="/visa.svg" alt="Visa" width={60} height={30} />
        <Image src="/mastercard.svg" alt="Mastercard" width={60} height={30} />
        <Image src="/mercadopago.svg" alt="Mercado Pago" width={60} height={30} />
      </div>
    </section>
  );
}