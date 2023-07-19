import { ReactNode, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

type CardProps = {
  children: ReactNode;
};

type SubtaskProps = {
  name: string;
  duration: number;
};

type TaskProps = {
  name: string;
  duration: number;
  subtasks: SubtaskProps[] | undefined;
};

type TaskItemProps = {
  name: string;
  duration: number;
  showSubtasks?: boolean | undefined;
  onToggle?: () => void | undefined;
};

function Card({ children }: CardProps) {
  return (
    <div className="border-solid border-2 border-sky-500 m-2 p-2 rounded">
      {children}
    </div>
  );
}

function Task({ name, duration, subtasks }: TaskProps) {
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
            name={name}
            duration={duration}
            showSubtasks={showSubtasks}
            onToggle={handleToggleSubtasks}
          />
          <div>
            {showSubtasks && (
              <ul className="list-none pl-12">
                {subtasks.map((subtask) => (
                  <Subtask name={subtask.name} duration={subtask.duration} />
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
            name={name}
            duration={duration}
            onToggle={handleToggleSubtasks}
          />
        </li>
      </Card>
    );
  }

  return taskItem;
}

function TaskItem({ name, duration, showSubtasks, onToggle }: TaskItemProps) {
  const toggleSubTasksBtn = showSubtasks ? <FaAngleUp /> : <FaAngleDown />;

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
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

function Subtask({ name, duration }: SubtaskProps) {
  return (
    <li>
      <TaskItem name={name} duration={duration} />
    </li>
  );
}

export default function App() {
  const tasks = [
    {
      name: "Task 1",
      duration: 20,
      subtasks: [
        { name: "Subtask 1", duration: 5 },
        { name: "Subtask 2", duration: 5 },
        { name: "Subtask 3", duration: 10 },
      ],
    },
    {
      name: "Task 2",
      duration: 25,
    },
  ];

  return (
    <>
      <h1 className="text-center uppercase font-bold text-2xl">Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <Task
            name={task.name}
            duration={task.duration}
            subtasks={task.subtasks}
          />
        ))}
      </ul>
    </>
  );
}
