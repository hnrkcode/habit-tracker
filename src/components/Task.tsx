import { useState } from "react";
import { TaskProps } from "../types/common";
import TaskItem from "./TaskItem";
import Card from "./Card";
import Subtask from "./Subtask";

export default function Task({
  task,
  onTaskCheckbox,
  onSubtaskCheckbox,
}: TaskProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);

  function handleToggleSubtasks() {
    setShowSubtasks(!showSubtasks);
  }

  const subtasks = task.subtasks?.length && showSubtasks && (
    <ul className="list-none pl-12">
      {task.subtasks.map((subtask) => (
        <Subtask
          key={subtask.subtaskId}
          taskId={task.id}
          subtaskId={subtask.subtaskId}
          name={subtask.name}
          duration={subtask.duration}
          done={subtask.done}
          onSubtaskCheckbox={onSubtaskCheckbox}
        />
      ))}
    </ul>
  );

  return (
    <Card>
      <li>
        <TaskItem
          id={task.id}
          name={task.name}
          duration={task.duration}
          done={task.done}
          showSubtasks={task.subtasks ? showSubtasks : undefined}
          onToggle={handleToggleSubtasks}
          onCheckbox={onTaskCheckbox}
        />
        {subtasks}
      </li>
    </Card>
  );
}
