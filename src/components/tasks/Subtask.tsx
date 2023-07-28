import { SubtaskProps } from "../../types/common";
import SubtaskItem from "./SubtaskItem";

export default function Subtask({
  name,
  done,
  onSubtaskCheckbox,
}: SubtaskProps) {
  return (
    <li>
      <SubtaskItem name={name} done={done} onCheckbox={onSubtaskCheckbox} />
    </li>
  );
}
