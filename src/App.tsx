import dayjs from "dayjs";
import { useState } from "react";
import { RRule } from "rrule";

import DateSlider from "./components/dates/DateSlider";
import EditTaskForm from "./components/forms/EditTaskForm";
import NewTaskForm from "./components/forms/NewTaskForm";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Tasks from "./components/tasks/Tasks";
import initialTasks from "./data.json";
import { ModalActionType, TasksType, TaskType } from "./types/common";

enum ModalAction {
  Create = "create",
  Edit = "edit",
  Closed = "closed",
}

export default function App() {
  const [tasks, setTasks] = useState<TasksType>(initialTasks);
  const [modalAction, setModalAction] = useState<ModalActionType>(
    ModalAction.Closed
  );
  const [editTaskId, setEditTaskId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const filteredTasks = tasks.filter((task) => {
    const rule = RRule.fromString(task.rrule);
    const pastDate = dayjs(selectedDate).subtract(5, "day").toDate();
    const futureDate = dayjs(selectedDate).add(5, "day").toDate();
    const occurrences = rule.between(pastDate, futureDate);

    if (occurrences.some((date) => dayjs(date).isSame(selectedDate, "day"))) {
      return true;
    }

    return false;
  });

  function handleModal(action: ModalActionType) {
    setModalAction(action);
  }

  function handleOpenCreateModal() {
    handleModal(ModalAction.Create);
  }

  function handleOpenEditModal(id: string) {
    handleModal(ModalAction.Edit);
    setEditTaskId(id);
  }

  function handleCloseModal() {
    setModalAction(ModalAction.Closed);
  }

  function handleCreateTask(task: TaskType) {
    setTasks((prevTasks) => [...prevTasks, task]);
    handleCloseModal();
  }

  function handleEditTask(task: TaskType) {
    const hasNewSubtask = task.subtasks?.some(
      (subtask) => !subtask.done.includes(selectedDate)
    );

    const updatedTask = { ...task, done: hasNewSubtask ? [] : [...task.done] };

    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? updatedTask : prevTask
      )
    );

    handleCloseModal();
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    handleCloseModal();
  }

  function handleTaskCheckbox(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          // Check or uncheck the main task for the selected date.
          const isDateSelected = task.done.includes(selectedDate);
          const updatedTask = {
            ...task,
            done: isDateSelected
              ? task.done.filter((date) => date !== selectedDate)
              : [...task.done, selectedDate],
          };

          // Check or uncheck all subtasks for the selected date.
          if (task.subtasks) {
            updatedTask.subtasks = task.subtasks.map((subtask) => {
              const subtaskDone = isDateSelected
                ? subtask.done.filter((date) => date !== selectedDate)
                : [...new Set([...subtask.done, selectedDate])];
              return {
                ...subtask,
                done: subtaskDone,
              };
            });
          }

          return updatedTask;
        }

        return task;
      })
    );
  }

  function handleSubTaskCheckbox(taskId: string, subtaskId: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task };
          if (task.subtasks) {
            updatedTask.subtasks = task.subtasks.map((subtask) => {
              if (subtask.subtaskId === subtaskId) {
                const subtaskDone = subtask.done.includes(selectedDate)
                  ? subtask.done.filter((date) => date !== selectedDate)
                  : [...subtask.done, selectedDate];
                return {
                  ...subtask,
                  done: subtaskDone,
                };
              }
              return subtask;
            });

            // Check if all subtasks are checked and update the main task state accordingly.
            const allSubtasksChecked = updatedTask.subtasks.every((subtask) =>
              subtask.done.includes(selectedDate)
            );

            updatedTask.done = allSubtasksChecked
              ? [...new Set([...updatedTask.done, selectedDate])]
              : updatedTask.done.filter((date) => date !== selectedDate);
          }
          return updatedTask;
        }
        return task;
      })
    );
  }

  return (
    <>
      <Navbar onAddTask={handleOpenCreateModal} />
      <DateSlider onSelectDate={setSelectedDate} />
      <Tasks
        tasks={filteredTasks}
        selectedDate={selectedDate}
        onTaskCheckbox={handleTaskCheckbox}
        onSubtaskCheckbox={handleSubTaskCheckbox}
        onEditTask={handleOpenEditModal}
      />
      <Modal
        isOpen={modalAction !== ModalAction.Closed}
        onClose={handleCloseModal}
      >
        {modalAction === ModalAction.Create && (
          <NewTaskForm onSave={handleCreateTask} onCancel={handleCloseModal} />
        )}
        {modalAction === ModalAction.Edit && (
          <EditTaskForm
            taskId={editTaskId}
            tasks={tasks}
            onSave={handleEditTask}
            onDelete={handleDeleteTask}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </>
  );
}
