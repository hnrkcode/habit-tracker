import Task from "./Task";
import { TasksProps } from "../types/common";

export default function Tasks({
  tasks,
  onTaskCheckbox,
  onSubtaskCheckbox,
}: TasksProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          duration={task.duration}
          done={task.done}
          subtasks={task.subtasks}
          onTaskCheckbox={onTaskCheckbox}
          onSubtaskCheckbox={onSubtaskCheckbox}
        />
      ))}
    </ul>
  );
}
