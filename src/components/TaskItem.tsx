import { TaskItemProps } from "../types/common";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default function TaskItem({
  id,
  name,
  duration,
  done,
  showSubtasks,
  onToggle,
  onCheckbox,
}: TaskItemProps) {
  const toggleSubTasksBtn = showSubtasks ? <FaAngleUp /> : <FaAngleDown />;

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={done}
          onChange={() => onCheckbox && onCheckbox(id)}
        />
        {name}
      </div>

      {showSubtasks !== undefined && (
        <div onClick={onToggle} className="flex justify-center items-center">
          {toggleSubTasksBtn}
        </div>
      )}
    </div>
  );
}
