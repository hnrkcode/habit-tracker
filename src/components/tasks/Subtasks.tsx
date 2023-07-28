import { SubtasksProps } from "../../types/common";
import Subtask from "./Subtask";

export default function Subtasks({
  taskId,
  subtasks,
  selectedDate,
  onSubtaskCheckbox,
}: SubtasksProps) {
  return (
    <ul className="list-none pl-12">
      {subtasks.map(({ subtaskId, name, done }) => (
        <Subtask
          key={subtaskId}
          name={name}
          done={done.includes(selectedDate)}
          onSubtaskCheckbox={() => onSubtaskCheckbox(taskId, subtaskId)}
        />
      ))}
    </ul>
  );
}
