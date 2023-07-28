import dayjs from "dayjs";
import { TouchEvent, useState, WheelEvent } from "react";

import { DateSliderProps } from "../../types/common";
import DateItem from "./DateItem";

export default function DateSlider({
  selectedDate,
  onSelectDate,
}: DateSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentDate = dayjs();
  const datesArray = Array.from({ length: 7 }, (_, index) =>
    currentDate.add(index + scrollPosition - 3, "day")
  );

  function handleWheelScroll(event: WheelEvent) {
    const newScrollPosition = Math.ceil(
      scrollPosition - Math.sign(event.deltaY)
    );
    setScrollPosition(newScrollPosition);
  }

  function handleTouchScroll(event: TouchEvent) {
    const touch = event.touches[0];
    const startX = touch.clientX;
    let newScrollPosition = scrollPosition;

    function onTouchMove(event: TouchEvent) {
      const touchMove = event.touches[0];
      const deltaX = touchMove.clientX - startX;
      newScrollPosition = scrollPosition - deltaX / 50;
      setScrollPosition(newScrollPosition);
    }

    function onTouchEnd() {
      event.target.removeEventListener(
        "touchmove",
        onTouchMove as unknown as EventListener
      );

      event.target.removeEventListener("touchend", onTouchEnd);
    }

    event.target.addEventListener("touchend", onTouchEnd);
    event.target.addEventListener(
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
      {datesArray.map((date, index) => {
        const isSelectedDate = date.format("YYYY-MM-DD") === selectedDate;
        const borderColor = isSelectedDate
          ? "border-sky-500"
          : "border-transparent";

        return (
          <div
            className={`select-none cursor-pointer p-1 m-1 border-2 rounded-lg ${borderColor}`}
            key={index + scrollPosition}
            onClick={() => onSelectDate(index, scrollPosition, datesArray)}
          >
            <DateItem date={date} />
          </div>
        );
      })}
    </div>
  );
}
