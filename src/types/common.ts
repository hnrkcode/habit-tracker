import { ReactNode } from "react";

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
  id: number;
  name: string;
  duration: number;
  done: boolean;
  subtasks: SubtaskProps[] | undefined;
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
