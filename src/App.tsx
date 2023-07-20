import { useState } from "react";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleTaskCheckbox(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, done: !task.done };

          if (task.subtasks) {
            updatedTask.subtasks = task.subtasks.map((subtask) => ({
              ...subtask,
              done: !task.done,
            }));
          }

          return updatedTask;
        }

        return task;
      })
    );
  }

  function handleSubTaskCheckbox(taskId: number, subtaskId: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task };

          if (task.subtasks) {
            updatedTask.subtasks = task.subtasks.map((subtask) =>
              subtask.subtaskId === subtaskId
                ? {
                    ...subtask,
                    done: !subtask.done,
                  }
                : subtask
            );

            updatedTask.done = updatedTask.subtasks.every(
              (subtask) => subtask.done
            );
          }

          return updatedTask;
        }

        return task;
      })
    );
  }

  return (
    <>
      <h1 className="text-center uppercase font-bold text-2xl">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            duration={task.duration}
            done={task.done}
            subtasks={task.subtasks}
            onTaskCheckbox={handleTaskCheckbox}
            onSubtaskCheckbox={handleSubTaskCheckbox}
          />
        ))}
      </ul>
    </>
  );
}

const initialTasks = [
  {
    id: 0,
    name: "Task 1",
    duration: 20,
    done: false,
    subtasks: [
      { taskId: 0, subtaskId: 10, name: "Subtask 1", duration: 5, done: false },
      { taskId: 0, subtaskId: 11, name: "Subtask 2", duration: 5, done: true },
      {
        taskId: 0,
        subtaskId: 12,
        name: "Subtask 3",
        duration: 10,
        done: false,
      },
    ],
  },
  {
    id: 1,
    name: "Task 2",
    duration: 25,
    done: false,
  },
];
