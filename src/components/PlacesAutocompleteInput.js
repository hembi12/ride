// PlacesAutocompleteInput.js
"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";

export default function PlacesAutocompleteInput({
  placeholder,
  value,
  onChange,
  name = "",
}) {
  const autocompleteRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place?.formatted_address) {
      onChange(place.formatted_address);
      setShowWarning(false); // se seleccionó del listado
    }
  };

  const handleBlur = () => {
    const place = autocompleteRef.current.getPlace?.();
    if (!place?.formatted_address) {
      setShowWarning(true); // mostrar advertencia pero sin bloquear
    }
  };

  return (
    <div className="space-y-1">
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
        options={{
          componentRestrictions: { country: "mx" },
        }}
      >
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded bg-gray-100 text-black"
        />
      </Autocomplete>
      {showWarning && (
        <p className="text-sm text-blue-600">
          ¿No ves tu dirección? Puedes escribirla manualmente, pero te
          recomendamos usar las sugerencias.
        </p>
      )}
    </div>
  );
}
