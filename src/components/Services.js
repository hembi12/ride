import { Car, Plane, Route, PawPrint, Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Traslados al aeropuerto",
      description:
        "Servicio confiable para llegar o salir del aeropuerto sin estrés ni retrasos.",
      icon: <Plane className="w-10 h-10 text-indigo-600" />,
      price: "Desde $350 MXN",
      benefits: [
        "Monitoreo de vuelos",
        "Esperas sin costo adicional",
        "Servicio puntual garantizado",
      ],
    },
    {
      title: "Viajes en ciudad",
      description:
        "Traslados seguros dentro de la ciudad con atención puntual y personalizada.",
      icon: <Car className="w-10 h-10 text-indigo-600" />,
      price: "Desde $250 MXN",
      benefits: [
        "Conductor certificado",
        "Rutas optimizadas",
        "Tarifas accesibles",
      ],
    },
    {
      title: "Viajes foráneos",
      description:
        "Viajes largos o fuera de la ciudad con comodidad y tarifas claras.",
      icon: <Route className="w-10 h-10 text-indigo-600" />,
      price: "Desde $900 MXN",
      benefits: [
        "Cobertura regional",
        "Paradas personalizadas",
        "Asientos reclinables",
      ],
    },
    {
      title: "Traslados Pet Friendly",
      description:
        "Viaja con tu mascota con comodidad, seguridad y sin preocupaciones.",
      icon: <PawPrint className="w-10 h-10 text-indigo-600" />,
      price: "Desde $400 MXN",
      benefits: [
        "Espacio cómodo para todos",
        "Conductor pet friendly",
        "Con o sin transportadora",
      ],
    },
  ];

  return (
    <section id="servicios" className="py-20 px-6 bg-neutral-100 text-black">
      <div className="max-w-6xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold">Servicios de transporte privado</h2>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-left flex flex-col justify-between"
          >
            <div>
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-indigo-700 font-bold mb-2">
                {(() => {
                  const match = service.price.match(/Desde\s*(\$?\d+)\s*MXN/i);
                  return match ? (
                    <>
                      <span className="text-lg align-bottom text-neutral-800">
                        Desde{" "}
                      </span>
                      <span className="text-3xl">{match[1]}</span>
                      <span className="text-md align-bottom text-neutral-800">
                        {" "}
                        MXN*
                      </span>
                    </>
                  ) : (
                    service.price // fallback si no hace match
                  );
                })()}
              </p>
              <p className="text-neutral-700 text-sm mb-3">
                {service.description}
              </p>
              <ul className="text-sm text-neutral-700 space-y-2">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#reserva"
              className="mt-6 w-full inline-block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Reservar ahora
            </a>
            <p className="text-xs text-gray-500 italic text-center mt-3">
              *Precio sugerido. Sujeto a cambios por distancia y tiempo del
              traslado.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
