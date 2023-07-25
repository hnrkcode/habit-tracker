import Task from "./Task";
import { TasksProps } from "../../types/common";

export default function Tasks({
  tasks,
  onTaskCheckbox,
  onSubtaskCheckbox,
  onEditTask,
}: TasksProps) {
  return (
    <>
      <h1 className="text-center uppercase font-bold text-2xl">Tasks</h1>
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
    </>
  );
}
