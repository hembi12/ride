"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingCalendar({ form, setForm, fechasNoDisponibles, setDisponible }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDateChange = (date) => {
    const dateString = date.toISOString().split("T")[0];
    setForm({ ...form, fecha: dateString });
    setDisponible(null);
  };

  return (
    <div className="w-full md:w-1/2 bg-white rounded-xl p-6 shadow-md flex justify-center items-start">
      {isClient && (
        <Calendar
          onChange={handleDateChange}
          value={form.fecha ? new Date(form.fecha) : null}
          tileDisabled={({ date }) => {
            const d = date.toISOString().split("T")[0];
            return fechasNoDisponibles.includes(d);
          }}
          className="react-calendar border-none"
        />
      )}
    </div>
  );
}