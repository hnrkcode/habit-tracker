import { ReactNode, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

type CardProps = {
  children: ReactNode;
};

type SubtaskProps = {
  taskId: number;
  subtaskId: number;
  name: string;
  duration: number;
  done: boolean;
  onSubtaskCheckbox?: (taskId: number, subtaskId: number) => void;
};

type TaskProps = {
  id: number;
  name: string;
  duration: number;
  done: boolean;
  subtasks: SubtaskProps[] | undefined;
  onTaskCheckbox: (id: number) => void;
  onSubtaskCheckbox: (taskId: number, subtaskId: number) => void;
};

type TaskItemProps = {
  id: number;
  name: string;
  duration: number;
  done: boolean;
  showSubtasks?: boolean | undefined;
  onToggle?: () => void | undefined;
  onCheckbox?: (id: number) => void | undefined;
};

function Card({ children }: CardProps) {
  return (
    <div className="border-solid border-2 border-sky-500 m-2 p-2 rounded">
      {children}
    </div>
  );
}

function Task({
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

function TaskItem({
  id,
  name,
  duration,
  done,
  showSubtasks,
  onToggle,
  onCheckbox,
}: TaskItemProps) {
  const toggleSubTasksBtn = showSubtasks ? <FaAngleUp /> : <FaAngleDown />;

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={done}
          onChange={() => onCheckbox && onCheckbox(id)}
        />
        {name} ({duration})
      </div>

      {showSubtasks !== undefined && (
        <div onClick={onToggle} className="flex justify-center items-center">
          {toggleSubTasksBtn}
        </div>
      )}
    </div>
  );
}

function Subtask({
  taskId,
  subtaskId,
  name,
  duration,
  done,
  onSubtaskCheckbox,
}: SubtaskProps) {
  return (
    <li>
      <TaskItem
        id={subtaskId}
        name={name}
        duration={duration}
        done={done}
        onCheckbox={() =>
          onSubtaskCheckbox && onSubtaskCheckbox(taskId, subtaskId)
        }
      />
    </li>
  );
}

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
