import { useState } from "react";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import NewTaskForm from "./components/NewTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import { TaskType } from "./types/common";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [editTaskId, setEditTaskId] = useState("");

  function handleModal(action: string) {
    setShowModal(!showModal);
    setModalAction(action);
  }

  function handleCreateTask(task: TaskType) {
    setTasks((prevTasks) => [...prevTasks, task]);
    setShowModal(!showModal);
  }

  function handleEditTask(task: TaskType) {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id ? { ...task } : prevTask
      )
    );
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
      <h1 className="text-center uppercase font-bold text-2xl">Tasks</h1>
      <Tasks
        tasks={tasks}
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
            onCancel={() => setShowModal(!showModal)}
          />
        )}
      </Modal>
    </>
  );
}

const initialTasks = [
  {
    id: "74771701-e411-4ce2-ab9f-2de55bfcefbf",
    name: "Task 1",
    done: false,
    subtasks: [
      {
        taskId: "74771701-e411-4ce2-ab9f-2de55bfcefbf",
        subtaskId: "feb714e4-96b0-4874-97ca-a8ea429d9591",
        name: "Subtask 1",
        done: false,
      },
      {
        taskId: "74771701-e411-4ce2-ab9f-2de55bfcefbf",
        subtaskId: "2655a21a-4146-42f5-815e-ad863686c88f",
        name: "Subtask 2",
        done: true,
      },
      {
        taskId: "74771701-e411-4ce2-ab9f-2de55bfcefbf",
        subtaskId: "3d8e4f92-76a4-4b2b-847a-33431085e3bc",
        name: "Subtask 3",
        done: false,
      },
    ],
  },
  {
    id: "33d7d82a-c260-4f90-ace9-f7785ad555a7",
    name: "Task 2",
    done: false,
  },
];
