import { SubtaskItemProps } from "../types/common";

export default function SubtaskItem({
  id,
  name,
  duration,
  done,
  onCheckbox,
}: SubtaskItemProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={done}
          onChange={() => onCheckbox(id)}
        />
        <span className="mr-2">{name}</span>
      </div>
    </div>
  );
}
