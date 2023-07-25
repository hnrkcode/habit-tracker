import { useState, WheelEvent, TouchEvent } from "react";
import { DatesProps } from "../types/common";
import dayjs from "dayjs";

export default function Dates({ onSelectDate }: DatesProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentDate = dayjs();
  const datesArray = Array.from({ length: 7 }, (_, index) =>
    currentDate.add(index + scrollPosition - 3, "day")
  );

  function handleDateClick(index: number) {
    const selectedDate = datesArray[index - scrollPosition];

    if (selectedDate !== undefined) {
      setSelectedDateIndex(index);
      onSelectDate(selectedDate.format("YYYY-MM-DD"));
    }
  }

  function handleWheelScroll(event: WheelEvent) {
    const newScrollPosition = scrollPosition - Math.sign(event.deltaY);
    setScrollPosition(newScrollPosition);
  }

  function handleTouchScroll(event: TouchEvent) {
    const touch = event.touches[0];
    const startX = touch.clientX;
    let newScrollPosition = scrollPosition;

    function onTouchMove(e: TouchEvent) {
      const touchMove = e.touches[0];
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
      {datesArray.map((date, index) => (
        <div
          className={`select-none cursor-pointer p-1 m-1 ${
            selectedDateIndex === index + scrollPosition
              ? "border-sky-500 border-2 rounded-lg"
              : ""
          }`}
          key={index + scrollPosition}
          onClick={() => handleDateClick(index + scrollPosition)}
        >
          <div className="text-center text-lg font-bold">
            {date.format("ddd")}
          </div>
          <div className="text-center">{date.format("MMM")}</div>
          <div className="text-center">{date.format("D")}</div>
        </div>
      ))}
    </div>
  );
}
