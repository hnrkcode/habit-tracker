import { ChangeEvent } from "react";

type IntervalOptionProps = {
  interval: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function IntervalOption({
  interval,
  onDecrement,
  onIncrement,
  onChange,
}: IntervalOptionProps) {
  return (
    <div>
      <label htmlFor="interval" className="block font-medium mb-1">
        Interval:
      </label>
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={onDecrement}
          className="px-3 py-2 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          -
        </button>
        <input
          type="number"
          id="interval"
          name="interval"
          value={interval}
          onChange={onChange}
          min="1"
          className="w-1/5 border-y border-gray-300 px-3 py-2"
        />
        <button
          type="button"
          onClick={onIncrement}
          className="px-3 py-2 border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          +
        </button>
      </div>
    </div>
  );
}
