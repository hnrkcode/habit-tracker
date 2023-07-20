import { SubtaskProps } from "../types/common";
import TaskItem from "./TaskItem";

export default function Subtask({
  taskId,
  subtaskId,
  name,
  duration,
  done,
  onSubtaskCheckbox,
}: SubtaskProps) {
  return (
    <li>
      <TaskItem
        id={subtaskId}
        name={name}
        duration={duration}
        done={done}
        onCheckbox={() =>
          onSubtaskCheckbox && onSubtaskCheckbox(taskId, subtaskId)
        }
      />
    </li>
  );
}
