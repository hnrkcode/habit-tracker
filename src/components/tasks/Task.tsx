import { useState } from "react";

import { TaskProps } from "../../types/common";
import Card from "../Card";
import Subtasks from "./Subtasks";
import TaskItem from "./TaskItem";

export default function Task({
  task,
  selectedDate,
  onTaskCheckbox,
  onSubtaskCheckbox,
  onEditTask,
}: TaskProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const hasSubtasks = task.subtasks !== undefined && task.subtasks.length > 0;

  function handleToggleSubtasks() {
    setShowSubtasks(!showSubtasks);
  }

  return (
    <Card>
      <li>
        <TaskItem
          id={task.id}
          name={task.name}
          done={task.done.includes(selectedDate)}
          hasSubtasks={hasSubtasks}
          showSubtasks={showSubtasks}
          onToggle={handleToggleSubtasks}
          onCheckbox={onTaskCheckbox}
          onEditTask={onEditTask}
        />
        {task.subtasks !== undefined && showSubtasks && (
          <Subtasks
            taskId={task.id}
            selectedDate={selectedDate}
            subtasks={task.subtasks}
            onSubtaskCheckbox={onSubtaskCheckbox}
          />
        )}
      </li>
    </Card>
  );
}
