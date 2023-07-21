import Task from "./Task";
import { TasksProps } from "../types/common";

export default function Tasks({
  tasks,
  onTaskCheckbox,
  onSubtaskCheckbox,
  onEditTask,
}: TasksProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskCheckbox={onTaskCheckbox}
          onSubtaskCheckbox={onSubtaskCheckbox}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
