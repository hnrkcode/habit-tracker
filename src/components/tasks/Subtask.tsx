import { SubtaskProps } from "../../types/common";
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
        name={name}
        done={done}
        onCheckbox={() => onSubtaskCheckbox(taskId, subtaskId)}
      />
    </li>
  );
}
