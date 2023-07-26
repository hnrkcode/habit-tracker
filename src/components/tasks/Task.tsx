import { useState } from "react";
import { TaskProps } from "../../types/common";
import TaskItem from "./TaskItem";
import Card from "../Card";
import Subtasks from "./Subtasks";

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

  const subtasks = task.subtasks &&
    task.subtasks?.length > 0 &&
    showSubtasks && (
      <Subtasks
        taskId={task.id}
        subtasks={task.subtasks}
        onSubtaskCheckbox={onSubtaskCheckbox}
      />
    );

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
