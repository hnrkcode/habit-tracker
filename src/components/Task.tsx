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
  let taskItem = null;

  function handleToggleSubtasks() {
    setShowSubtasks(!showSubtasks);
  }

  if (task.subtasks?.length) {
    taskItem = (
      <Card>
        <li>
          <TaskItem
            id={task.id}
            name={task.name}
            duration={task.duration}
            done={task.done}
            showSubtasks={showSubtasks}
            onToggle={handleToggleSubtasks}
            onCheckbox={onTaskCheckbox}
          />
          <div>
            {showSubtasks && (
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
            )}
          </div>
        </li>
      </Card>
    );
  } else {
    taskItem = (
      <Card>
        <li>
          <TaskItem
            id={task.id}
            name={task.name}
            duration={task.duration}
            done={task.done}
            onToggle={handleToggleSubtasks}
            onCheckbox={onTaskCheckbox}
          />
        </li>
      </Card>
    );
  }

  return taskItem;
}
