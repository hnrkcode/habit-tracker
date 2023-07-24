import { useState, WheelEvent } from "react";
import dayjs from "dayjs";

export default function Dates() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentDate = dayjs();
  const datesArray = Array.from({ length: 7 }, (_, index) =>
    currentDate.add(index + scrollPosition - 3, "day")
  );

  function handleDateClick(index: number) {
    setSelectedDateIndex(index);
    console.log("currently selected date:", datesArray[index - scrollPosition]);
  }

  function handleWheelScroll(event: WheelEvent) {
    const newScrollPosition = scrollPosition - Math.sign(event.deltaY);
    setScrollPosition(newScrollPosition);
  }

  return (
    <div
      className="flex justify-between overflow-hidden"
      onWheel={handleWheelScroll}
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
