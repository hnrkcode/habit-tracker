import dayjs from "dayjs";
import { TouchEvent, useState, WheelEvent } from "react";

import { DateSliderProps } from "../../types/common";
import DateItem from "./DateItem";

function generateSliderDates(scrollPosition: number): dayjs.Dayjs[] {
  const now = dayjs();
  const initialIndex = 3;
  const dates = Array.from({ length: 7 }, (_, index) =>
    now.add(index + scrollPosition - initialIndex, "day")
  );

  return dates;
}

export default function DateSlider({
  selectedDate,
  onSelectDate,
}: DateSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const dates = generateSliderDates(scrollPosition);

  function handleWheelScroll(event: WheelEvent) {
    setScrollPosition(Math.ceil(scrollPosition - Math.sign(event.deltaY)));
  }

  function handleTouchScroll(event: TouchEvent) {
    const { target, touches } = event;
    const startX = touches[0].clientX;

    const onTouchMove = (event: TouchEvent) => {
      const { clientX } = event.touches[0];
      const deltaX = clientX - startX;
      setScrollPosition(scrollPosition - deltaX / 50);
    };

    const onTouchEnd = () => {
      target.removeEventListener("touchend", onTouchEnd);
      target.removeEventListener(
        "touchmove",
        onTouchMove as unknown as EventListener
      );
    };

    target.addEventListener("touchend", onTouchEnd);
    target.addEventListener(
      "touchmove",
      onTouchMove as unknown as EventListener
    );
  }

  return (
    <div
      className="flex justify-between overflow-hidden"
      onWheel={handleWheelScroll}
      onTouchMove={handleTouchScroll}
    >
      {dates.map((date, index) => {
        const isSelectedDate = date.format("YYYY-MM-DD") === selectedDate;
        const borderColor = isSelectedDate
          ? "border-sky-500"
          : "border-transparent";

        return (
          <div
            className={`select-none cursor-pointer p-1 m-1 border-2 rounded-lg ${borderColor}`}
            key={index + scrollPosition}
            onClick={() => onSelectDate(index, scrollPosition, dates)}
          >
            <DateItem date={date} />
          </div>
        );
      })}
    </div>
  );
}
