import { useState } from "react";
import dayjs from "dayjs";

export default function Dates() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const currentDate = dayjs();
  const allDates = [];

  for (let i = 3; i >= 1; i--) {
    allDates.push({
      dayName: currentDate.subtract(i, "day").format("ddd"),
      date: currentDate.subtract(i, "day").format("MMM D"),
    });
  }

  allDates.push({
    dayName: currentDate.format("ddd"),
    date: currentDate.format("MMM D"),
  });

  for (let i = 1; i <= 3; i++) {
    allDates.push({
      dayName: currentDate.add(i, "day").format("ddd"),
      date: currentDate.add(i, "day").format("MMM D"),
    });
  }

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
