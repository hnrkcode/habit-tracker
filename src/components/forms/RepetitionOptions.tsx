import { RepetitionOptionsProps } from "../../types/common";
import FrequencyOption from "./FrequencyOption";

export default function RepetitionOptions({
  frequency,
  interval,
  onSelectedFrequency,
  onCheckedWeekdays,
  onUpdatedInterval,
}: RepetitionOptionsProps) {
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
    <>
      <h1 className="text-l font-semibold mb-4">Task Repetition</h1>
      <FrequencyOption onChange={(e) => onSelectedFrequency(e.target.value)} />
      {frequency !== null && (
        <>
          <div>
            <label htmlFor="interval" className="block font-medium mb-1">
              Interval:
            </label>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => onUpdatedInterval(interval - 1)}
                className="px-3 py-2 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                -
              </button>
              <input
                type="number"
                id="interval"
                name="interval"
                value={interval}
                onChange={(e) => onUpdatedInterval(Number(e.target.value))}
                min="1"
                className="w-1/5 border-y border-gray-300 px-3 py-2"
              />
              <button
                type="button"
                onClick={() => onUpdatedInterval(interval + 1)}
                className="px-3 py-2 border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                +
              </button>
            </div>
          </div>
          {frequency === "weekly" && (
            <div>
              <label htmlFor="weekdays" className="block font-medium mb-1">
                Weekdays:
              </label>

              <div className="flex flex-wrap justify-start">
                {byWeekdayOptions.map((option) => (
                  <label
                    key={option.id}
                    htmlFor={option.id}
                    className="flex items-center mr-4 mb-4"
                  >
                    <input
                      type="checkbox"
                      id={option.id}
                      name="weekdays"
                      value={option.value}
                      className="h-5 w-5 text-indigo-600 mr-2"
                      onChange={onCheckedWeekdays}
                    />
                    <span className="text-gray-800 font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
