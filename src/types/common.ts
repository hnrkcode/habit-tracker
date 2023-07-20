import { ReactNode } from "react";

type Tasks = Task[];

type Subtasks = Subtask[];

type Task = {
  id: number;
  name: string;
  duration: number;
  done: boolean;
  subtasks?: Subtasks | undefined;
};

type Subtask = {
  taskId: number;
  subtaskId: number;
  name: string;
  duration: number;
  done: boolean;
};

export type CardProps = {
  children: ReactNode;
};

export type SubtaskProps = {
  taskId: number;
  subtaskId: number;
  name: string;
  duration: number;
  done: boolean;
  onSubtaskCheckbox?: (taskId: number, subtaskId: number) => void;
};

export type TaskProps = {
  task: Task;
  onTaskCheckbox: (id: number) => void;
  onSubtaskCheckbox: (taskId: number, subtaskId: number) => void;
};

export type TasksProps = {
  tasks: Tasks;
  onTaskCheckbox: (id: number) => void;
  onSubtaskCheckbox: (taskId: number, subtaskId: number) => void;
};

export type TaskItemProps = {
  id: number;
  name: string;
  duration: number;
  done: boolean;
  showSubtasks?: boolean | undefined;
  onToggle?: () => void | undefined;
  onCheckbox?: (id: number) => void | undefined;
};
