import dayjs from "dayjs";
import { ChangeEvent, ReactNode } from "react";

export type TasksType = TaskType[];

export type SubtasksType = SubtaskType[];

export type ModalActionType = "create" | "edit" | "closed";

export type TaskType = {
  id: string;
  name: string;
  done: string[];
  rrule: string;
  subtasks?: SubtasksType | undefined;
};

export type SubtaskType = {
  taskId: string;
  subtaskId: string;
  name: string;
  done: string[];
};

export type CardProps = {
  children: ReactNode;
};

export type SubtaskProps = {
  name: string;
  done: boolean;
  onSubtaskCheckbox: () => void;
};

export type SubtasksProps = {
  taskId: string;
  subtasks: SubtasksType;
  selectedDate: string;
  onSubtaskCheckbox: (taskId: string, subtaskId: string) => void;
};

export type TaskProps = {
  task: TaskType;
  selectedDate: string;
  onTaskCheckbox: (id: string) => void;
  onSubtaskCheckbox: (taskId: string, subtaskId: string) => void;
  onEditTask: (id: string) => void;
};

export type TasksProps = {
  tasks: TasksType;
  selectedDate: string;
  onTaskCheckbox: (id: string) => void;
  onSubtaskCheckbox: (taskId: string, subtaskId: string) => void;
  onEditTask: (id: string) => void;
};

export type TaskItemProps = {
  id: string;
  name: string;
  done: boolean;
  hasSubtasks: boolean;
  showSubtasks?: boolean | undefined;
  onToggle?: () => void | undefined;
  onCheckbox: (id: string) => void;
  onEditTask: (id: string) => void;
};

export type SubtaskItemProps = {
  name: string;
  done: boolean;
  onCheckbox: () => void;
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

export type DateSliderProps = {
  selectedDate: string;
  onSelectDate: (
    index: number,
    scrollPos: number,
    dates: dayjs.Dayjs[]
  ) => void;
};

export type RepetitionOptionsProps = {
  frequency: string | null;
  interval: number;
  onSelectedFrequency: (value: string) => void;
  onCheckedWeekdays: (event: ChangeEvent<HTMLInputElement>) => void;
  onUpdatedInterval: (value: number) => void;
};

export type DateItemProps = {
  date: dayjs.Dayjs;
};

export interface TaskData {
  tasksCollection: {
    edges: TaskEdge[];
  };
}

export interface TaskEdge {
  node: {
    id: string;
    name: string;
    rrule: string | null;
    completed_tasksCollection?: {
      edges: CompletedTaskEdge[];
    };
    subtasksCollection?: {
      edges: SubtaskEdge[];
    };
  };
}

export interface CompletedTaskEdge {
  node: {
    task_id: string;
    completion_date: string;
  };
}

export interface SubtaskEdge {
  node: {
    task_id: string;
    id: string;
    name: string;
    completed_subtasksCollection?: {
      edges: CompletedSubtaskEdge[];
    };
  };
}

export interface CompletedSubtaskEdge {
  node: {
    subtask_id: string;
    completion_date: string;
  };
}
