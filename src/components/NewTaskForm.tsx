import { useState, ChangeEvent } from "react";
import { NewTaskFormProps, TaskType } from "../types/common";

export default function NewTaskForm({ onSave, onCancel }: NewTaskFormProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [subtaskNames, setSubtaskNames] = useState<string[]>([]);

  function handleTaskNameChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  function handleSubtaskNameChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const updatedSubtaskNames = [...subtaskNames];
    updatedSubtaskNames[index] = event.target.value;
    setSubtaskNames(updatedSubtaskNames);
  }

  function handleAddSubtask() {
    setSubtaskNames([...subtaskNames, ""]);
  }

  function handleRemoveSubtask(index: number) {
    const updatedSubtaskNames = [...subtaskNames];
    updatedSubtaskNames.splice(index, 1);
    setSubtaskNames(updatedSubtaskNames);
  }

  function handleSave() {
    let newTask: TaskType = {
      id: `${crypto.randomUUID()}`,
      name: taskName,
      duration: 0,
      done: false,
    };

    if (subtaskNames.length > 0) {
      newTask = {
        ...newTask,
        subtasks: subtaskNames.map((subtaskName) => ({
          taskId: newTask.id,
          subtaskId: `${crypto.randomUUID()}`,
          name: subtaskName,
          duration: 0,
          done: false,
        })),
      };
    }

    onSave(newTask);
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">New Task</h1>
      <div className="mb-4">
        <label htmlFor="taskName" className="block font-medium mb-1">
          Task Name:
        </label>
        <input
          type="text"
          id="taskName"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={taskName}
          onChange={handleTaskNameChange}
        />
      </div>
      {subtaskNames.length > 0 &&
        subtaskNames.map((subtaskName, index) => (
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
                value={subtaskName}
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
          onClick={handleSave}
        >
          Save
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
