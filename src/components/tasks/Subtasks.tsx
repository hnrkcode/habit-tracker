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
      {subtasks.map((subtask) => (
        <Subtask
          key={subtask.subtaskId}
          taskId={taskId}
          subtaskId={subtask.subtaskId}
          name={subtask.name}
          done={subtask.done.includes(selectedDate)}
          onSubtaskCheckbox={onSubtaskCheckbox}
        />
      ))}
    </ul>
  );
}
