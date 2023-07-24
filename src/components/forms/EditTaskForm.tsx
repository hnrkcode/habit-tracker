import { useState, ChangeEvent } from "react";
import { EditTaskFormProps, TaskType } from "../../types/common";

export default function EditTaskForm({
  taskId,
  tasks,
  onSave,
  onDelete,
  onCancel,
}: EditTaskFormProps) {
  const [task, setTask] = useState<TaskType>(
    tasks.filter((task) => task.id === taskId)[0]
  );

  function handleAddSubtask() {
    const subtasks = [
      ...(task.subtasks ?? []),
      {
        taskId: task.id,
        subtaskId: `${crypto.randomUUID()}`,
        name: "",
        done: false,
      },
    ];

    const updatedTask =
      subtasks.length > 0 ? { ...task, subtasks } : { ...task };
    setTask(updatedTask);
  }

  function handleSubtaskNameChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (task.subtasks) {
      const subtasks = [...task.subtasks];
      subtasks[index] = { ...subtasks[index], name: event.target.value };
      setTask((prevTask) => ({ ...prevTask, subtasks: [...subtasks] }));
    }
  }

  function handleRemoveSubtask(index: number) {
    if (task.subtasks) {
      const subtasks = [...task.subtasks];
      subtasks.splice(index, 1);
      setTask((prevTask) => ({ ...prevTask, subtasks: [...subtasks] }));
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Task</h1>
      <div className="mb-4">
        <label htmlFor="taskName" className="block font-medium mb-1">
          Task Name:
        </label>
        <input
          type="text"
          id="taskName"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={task.name}
          onChange={(e) =>
            setTask((prevTask) => ({ ...prevTask, name: e.target.value }))
          }
        />
      </div>

      {task.subtasks &&
        task.subtasks?.length > 0 &&
        task.subtasks.map((subtask, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`subtaskName-${index}`}
              className="block font-medium mb-1"
            >
              Subtask {index + 1}:
            </label>
            <div className="flex">
              <input
                type="text"
                id={`subtaskName-${index}`}
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={subtask.name}
                onChange={(event) => handleSubtaskNameChange(index, event)}
              />

              <button
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRemoveSubtask(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      <div className="mb-4 flex justify-center">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddSubtask}
        >
          Add Subtask
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={() => onSave(task)}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded mr-2"
          onClick={() => onDelete(taskId)}
        >
          Delete
        </button>
        <button
          className="px-4 py-2 bg-white-500 text-black border-solid border-2 border-gray-300 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
