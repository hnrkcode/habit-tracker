import { ChangeEvent } from "react";

import { RepetitionOptionsProps } from "../../types/common";
import FrequencyOption from "./FrequencyOption";
import IntervalOption from "./IntervalOption";
import WeekdaysOption from "./WeekdaysOption";

export default function RepetitionOptions({
  frequency,
  interval,
  onSelectedFrequency,
  onCheckedWeekdays,
  onUpdatedInterval,
}: RepetitionOptionsProps) {
  function handleFrequencyChange(event: ChangeEvent<HTMLInputElement>) {
    onSelectedFrequency(event.target.value);
  }

  function handleIntervalChange(event: ChangeEvent<HTMLInputElement>) {
    onUpdatedInterval(Number(event.target.value));
  }

  function handleDecrementInterval() {
    onUpdatedInterval(interval - 1);
  }

  function handleIncrementInterval() {
    onUpdatedInterval(interval + 1);
  }

  return (
    <>
      <h1 className="text-l font-semibold mb-4">Task Repetition</h1>
      <FrequencyOption onChange={handleFrequencyChange} />
      {frequency !== null && (
        <>
          <IntervalOption
            interval={interval}
            onDecrement={handleDecrementInterval}
            onIncrement={handleIncrementInterval}
            onChange={handleIntervalChange}
          />
          {frequency === "weekly" && (
            <WeekdaysOption onChange={onCheckedWeekdays} />
          )}
        </>
      )}
    </>
  );
}
