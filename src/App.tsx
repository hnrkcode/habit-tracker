import { useState } from "react";
import Tasks from "./components/tasks/Tasks";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import NewTaskForm from "./components/forms/NewTaskForm";
import EditTaskForm from "./components/forms/EditTaskForm";
import Dates from "./components/Dates";
import { TaskType } from "./types/common";
import dayjs from "dayjs";
import { RRule } from "rrule";
import initialTasks from "./data.json";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
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

  function handleModal(action: string) {
    setShowModal(!showModal);
    setModalAction(action);
  }

  function handleCreateTask(task: TaskType) {
    setTasks((prevTasks) => [...prevTasks, task]);
    setShowModal(!showModal);
  }

  function handleEditTask(task: TaskType) {
    const hasNewSubtask = task.subtasks?.some((subtask) => !subtask.done);
    const updatedTask = { ...task, done: hasNewSubtask ? false : task.done };

    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? updatedTask : prevTask
      )
    );
    setShowModal(!showModal);
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setShowModal(!showModal);
  }

  function handleOpenCreateModal() {
    handleModal("create");
  }

  function handleOpenEditModal(id: string) {
    handleModal("edit");
    setEditTaskId(id);
  }

  function handleTaskCheckbox(id: string) {
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

  function handleSubTaskCheckbox(taskId: string, subtaskId: string) {
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
      <Navbar onAddTask={handleOpenCreateModal} />
      <Dates onSelectDate={setSelectedDate} />
      <h1 className="text-center uppercase font-bold text-2xl">Tasks</h1>
      <Tasks
        tasks={filteredTasks}
        onTaskCheckbox={handleTaskCheckbox}
        onSubtaskCheckbox={handleSubTaskCheckbox}
        onEditTask={handleOpenEditModal}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalAction === "create" && (
          <NewTaskForm
            onSave={handleCreateTask}
            onCancel={() => setShowModal(!showModal)}
          />
        )}
        {modalAction === "edit" && (
          <EditTaskForm
            taskId={editTaskId}
            tasks={tasks}
            onSave={handleEditTask}
            onDelete={handleDeleteTask}
            onCancel={() => setShowModal(!showModal)}
          />
        )}
      </Modal>
    </>
  );
}
