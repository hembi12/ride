"use client";

export default function BookingSteps() {
  const steps = [
    {
      title: 'Elige tu servicio',
      description:
        'Selecciona el tipo de traslado que necesitas: ciudad, aeropuerto, foráneo o VIP.',
    },
    {
      title: 'Llena el formulario',
      description:
        'Proporciona fecha, hora, ubicación y tus datos de contacto.',
    },
    {
      title: 'Confirma la reserva',
      description:
        'Recibe confirmación vía WhatsApp o llamada directa.',
    },
    {
      title: 'Disfruta tu viaje',
      description:
        'Tu conductor llegará puntual para brindarte un traslado seguro y cómodo.',
    },
  ];

  return (
    <section
      id="como-reservar"
      className="py-20 px-6 bg-neutral-100 text-black"
    >
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">¿Cómo reservar?</h2>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-left"
          >
            <div className="mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-2">
                {index + 1}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}