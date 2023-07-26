import { ChangeEvent } from "react";

type WeekdaysOptionProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function WeekdaysOption({ onChange }: WeekdaysOptionProps) {
  const byWeekdayOptions = [
    { id: "monday", value: "MO", label: "Mon" },
    { id: "tuesday", value: "TU", label: "Tue" },
    { id: "wednesday", value: "WE", label: "Wed" },
    { id: "thursday", value: "TH", label: "Thu" },
    { id: "friday", value: "FR", label: "Fri" },
    { id: "saturday", value: "SA", label: "Sat" },
    { id: "sunday", value: "SU", label: "Sun" },
  ];

  return (
    <div>
      <label htmlFor="weekdays" className="block font-medium mb-1">
        Weekdays:
      </label>

      <div className="flex flex-wrap justify-start">
        {byWeekdayOptions.map(({ id, value, label }) => (
          <label key={id} htmlFor={id} className="flex items-center mr-4 mb-4">
            <input
              type="checkbox"
              id={id}
              name="weekdays"
              value={value}
              className="h-5 w-5 text-indigo-600 mr-2"
              onChange={onChange}
            />
            <span className="text-gray-800 font-medium">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
