import { SubtaskProps } from "../types/common";
import SubtaskItem from "./SubtaskItem";

export default function Subtask({
  taskId,
  subtaskId,
  name,
  done,
  onSubtaskCheckbox,
}: SubtaskProps) {
  return (
    <li>
      <SubtaskItem
        id={subtaskId}
        name={name}
        done={done}
        onCheckbox={() =>
          onSubtaskCheckbox && onSubtaskCheckbox(taskId, subtaskId)
        }
      />
    </li>
  );
}
