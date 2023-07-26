import { ChangeEvent, Fragment } from "react";

type FrequencyOptionProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function FrequencyOption({ onChange }: FrequencyOptionProps) {
  const frequencyOptions = [
    { id: "daily", value: "daily", label: "Daily" },
    { id: "weekly", value: "weekly", label: "Weekly" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {frequencyOptions.map(({ id, value, label }) => (
        <Fragment key={id}>
          <input
            type="radio"
            id={id}
            name="repetition"
            value={value}
            className="text-indigo-600 h-5 w-5"
            onChange={onChange}
          />
          <label htmlFor={id} className="block font-medium mb-1">
            {label}
          </label>
        </Fragment>
      ))}
    </div>
  );
}
