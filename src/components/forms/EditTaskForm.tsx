import { ChangeEvent, useState } from "react";

import { EditTaskFormProps, TaskType } from "../../types/common";
import AddSubtaskButton from "../buttons/AddSubtaskButton";
import CancelButton from "../buttons/CancelButton";
import DeleteButton from "../buttons/DeleteButton";
import SaveButton from "../buttons/SaveButton";
import TextInput from "../inputs/TextInput";

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
  const [hasErrors, setHasErrors] = useState(false);

  function handleSave() {
    if (
      task.name === "" ||
      task.subtasks?.some((subtask) => subtask.name === "")
    ) {
      setHasErrors(true);
      return;
    }

    onSave(task);
  }

  function handleAddSubtask() {
    const subtasks = [
      ...(task.subtasks ?? []),
      {
        taskId: task.id,
        subtaskId: `${crypto.randomUUID()}`,
        name: "",
        done: [],
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

  const emptyFieldError = <p className="text-red-500">Can't be empty</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Task</h1>
      <div className="mb-4">
        <label htmlFor="taskName" className="block font-medium mb-1">
          Task Name:
        </label>
        <TextInput
          id={"taskName"}
          value={task.name}
          onChange={(event) =>
            setTask((prevTask) => ({ ...prevTask, name: event.target.value }))
          }
        />
        {hasErrors && task.name === "" && emptyFieldError}
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
            <div className="flex gap-x-1">
              <TextInput
                id={`subtaskName-${index}`}
                value={subtask.name}
                onChange={(event) => handleSubtaskNameChange(index, event)}
              />
              <DeleteButton onDelete={() => handleRemoveSubtask(index)} />
            </div>
            {hasErrors && subtask.name === "" && emptyFieldError}
          </div>
        ))}

      <div className="mb-4 flex justify-center">
        <AddSubtaskButton onAddSubtask={handleAddSubtask} />
      </div>
      <div className="flex justify-center mt-4 gap-x-1">
        <SaveButton onSave={handleSave} />
        <DeleteButton onDelete={() => onDelete(taskId)} />
        <CancelButton onCancel={onCancel} />
      </div>
    </div>
  );
}
