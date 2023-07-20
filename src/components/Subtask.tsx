import { SubtaskProps } from "../types/common";
import SubtaskItem from "./SubtaskItem";

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
      <SubtaskItem
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
