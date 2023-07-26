import { RepetitionOptionsProps } from "../../types/common";
import FrequencyOption from "./FrequencyOption";
import IntervalOption from "./IntervalOption";

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
          <IntervalOption
            interval={interval}
            onDecrement={() => onUpdatedInterval(interval - 1)}
            onIncrement={() => onUpdatedInterval(interval + 1)}
            onChange={(event) => onUpdatedInterval(Number(event.target.value))}
          />
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
