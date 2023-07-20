import { useState } from "react";
import { TaskProps } from "../types/common";
import TaskItem from "./TaskItem";
import Card from "./Card";
import Subtask from "./Subtask";

export default function Task({
  id,
  name,
  duration,
  done,
  subtasks,
  onTaskCheckbox,
  onSubtaskCheckbox,
}: TaskProps) {
  const [showSubtasks, setShowSubtasks] = useState(false);
  let taskItem = null;

  function handleToggleSubtasks() {
    setShowSubtasks(!showSubtasks);
  }

  if (subtasks?.length) {
    taskItem = (
      <Card>
        <li>
          <TaskItem
            id={id}
            name={name}
            duration={duration}
            done={done}
            showSubtasks={showSubtasks}
            onToggle={handleToggleSubtasks}
            onCheckbox={onTaskCheckbox}
          />
          <div>
            {showSubtasks && (
              <ul className="list-none pl-12">
                {subtasks.map((subtask) => (
                  <Subtask
                    key={subtask.subtaskId}
                    taskId={id}
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
            id={id}
            name={name}
            duration={duration}
            done={done}
            onToggle={handleToggleSubtasks}
            onCheckbox={onTaskCheckbox}
          />
        </li>
      </Card>
    );
  }

  return taskItem;
}
