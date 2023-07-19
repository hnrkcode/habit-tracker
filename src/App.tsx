import { ReactNode, useState } from "react";

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
        <li onClick={handleToggleSubtasks}>
          {name} ({duration})
          {showSubtasks && (
            <ul className="list-none pl-12">
              {subtasks.map((subtask) => (
                <Subtask name={subtask.name} duration={subtask.duration} />
              ))}
            </ul>
          )}
        </li>
      </Card>
    );
  } else {
    taskItem = (
      <Card>
        <li>
          {name} ({duration})
        </li>
      </Card>
    );
  }

  return taskItem;
}

function Subtask({ name, duration }: SubtaskProps) {
  return (
    <li>
      {name} ({duration})
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
