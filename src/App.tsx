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

const initialTasks = [
  {
    id: "74771701-e411-4ce2-ab9f-2de55bfcefbf",
    name: "Do this every other day",
    done: false,
    rrule: "DTSTART:20230720T000000Z\nRRULE:FREQ=DAILY;INTERVAL=2",
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
    name: "Dayly task",
    done: false,
    rrule: "DTSTART:20230701T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1",
  },
  {
    id: "2e83431b-e8f6-48da-9dd4-09aae5133045",
    name: "Weekly task on Mondays & Wednesdays",
    done: false,
    rrule: "DTSTART:20230703T000000Z\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE",
  },
];
