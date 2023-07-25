import { DateItemProps } from "../../types/common";

export default function DateItem({ date }: DateItemProps) {
  return (
    <>
      <div className="text-center text-lg font-bold">{date.format("ddd")}</div>
      <div className="text-center">{date.format("MMM")}</div>
      <div className="text-center">{date.format("D")}</div>
    </>
  );
}
