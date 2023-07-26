import { FaAngleDown, FaAngleUp, FaPen } from "react-icons/fa";

import { TaskItemProps } from "../../types/common";

export default function TaskItem({
  id,
  name,
  done,
  hasSubtasks,
  showSubtasks,
  onToggle,
  onCheckbox,
  onEditTask,
}: TaskItemProps) {
  const toggleSubTasksBtn = showSubtasks ? <FaAngleUp /> : <FaAngleDown />;

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
        <FaPen onClick={() => onEditTask(id)} />
      </div>

      {hasSubtasks && (
        <div onClick={onToggle} className="flex justify-center items-center">
          {toggleSubTasksBtn}
        </div>
      )}
    </div>
  );
}
