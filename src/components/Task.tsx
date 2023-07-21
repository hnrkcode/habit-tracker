import { useState } from "react";
import { TaskProps } from "../types/common";
import TaskItem from "./TaskItem";
import Card from "./Card";
import Subtask from "./Subtask";

export default function Task({
  task,
  onTaskCheckbox,
  onSubtaskCheckbox,
  onEditTask,
}: TaskProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);

  function handleToggleSubtasks() {
    setShowSubtasks(!showSubtasks);
  }

  const subtasks =
    task.subtasks && task.subtasks?.length > 0 && showSubtasks ? (
      <ul className="list-none pl-12">
        {task.subtasks.map((subtask) => (
          <Subtask
            key={subtask.subtaskId}
            taskId={task.id}
            subtaskId={subtask.subtaskId}
            name={subtask.name}
            done={subtask.done}
            onSubtaskCheckbox={onSubtaskCheckbox}
          />
        ))}
      </ul>
    ) : null;

  return (
    <Card>
      <li>
        <TaskItem
          id={task.id}
          name={task.name}
          done={task.done}
          showSubtasks={
            task.subtasks && task.subtasks?.length > 0
              ? showSubtasks
              : undefined
          }
          onToggle={handleToggleSubtasks}
          onCheckbox={onTaskCheckbox}
          onEditTask={onEditTask}
        />
        {subtasks}
      </li>
    </Card>
  );
}
