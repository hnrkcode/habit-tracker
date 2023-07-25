import { ReactNode } from "react";

export type TasksType = TaskType[];

export type SubtasksType = SubtaskType[];

export type TaskType = {
  id: string;
  name: string;
  done: boolean;
  rrule: string;
  subtasks?: SubtasksType | undefined;
};

export type SubtaskType = {
  taskId: string;
  subtaskId: string;
  name: string;
  done: boolean;
};

export type CardProps = {
  children: ReactNode;
};

export type SubtaskProps = {
  taskId: string;
  subtaskId: string;
  name: string;
  done: boolean;
  onSubtaskCheckbox?: (taskId: string, subtaskId: string) => void;
};

export type TaskProps = {
  task: TaskType;
  onTaskCheckbox: (id: string) => void;
  onSubtaskCheckbox: (taskId: string, subtaskId: string) => void;
  onEditTask: (id: string) => void;
};

export type TasksProps = {
  tasks: TasksType;
  onTaskCheckbox: (id: string) => void;
  onSubtaskCheckbox: (taskId: string, subtaskId: string) => void;
  onEditTask: (id: string) => void;
};

export type TaskItemProps = {
  id: string;
  name: string;
  done: boolean;
  showSubtasks?: boolean | undefined;
  onToggle?: () => void | undefined;
  onCheckbox?: (id: string) => void | undefined;
  onEditTask: (id: string) => void;
};

export type SubtaskItemProps = {
  id: string;
  name: string;
  done: boolean;
  onCheckbox: (id: string) => void | undefined;
};

export type NavbarProps = {
  onAddTask: () => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export type NewTaskFormProps = {
  onSave: (task: TaskType) => void;
  onCancel: () => void;
};

export type EditTaskFormProps = {
  taskId: string;
  tasks: TasksType;
  onSave: (task: TaskType) => void;
  onDelete: (taskId: string) => void;
  onCancel: () => void;
};

export type DatesProps = {
  onSelectDate: (date: string) => void;
};
