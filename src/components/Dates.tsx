import { useState } from "react";
import dayjs from "dayjs";

export default function Dates() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const currentDate = dayjs();
  const allDates = Array.from({ length: 7 }, (_, i) => ({
    dayName: currentDate.add(i - 3, "day").format("ddd"),
    date: currentDate.add(i - 3, "day").format("MMM D"),
  }));

  function handleDateClick(index: number) {
    setSelectedDateIndex(index);
  }

  return (
    <div className="flex justify-between">
      {allDates.map(({ dayName, date }, index) => (
        <div
          className={`select-none cursor-pointer p-1 m-1 ${
            selectedDateIndex === index
              ? "border-blue-500 border-2 rounded-lg"
              : ""
          }`}
          key={index}
          onClick={() => handleDateClick(index)}
        >
          <div className="text-center text-lg font-bold">{dayName}</div>
          <div className="text-center">{date}</div>
        </div>
      ))}
    </div>
  );
}
