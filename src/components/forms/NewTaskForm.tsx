import { useState, ChangeEvent } from "react";
import { NewTaskFormProps, TaskType } from "../../types/common";
import RepetitionOptions from "./RepetitionOptions";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";
import AddSubtaskButton from "../buttons/AddSubtaskButton";
import { RRule, Weekday } from "rrule";
import dayjs from "dayjs";
import DeleteButton from "../buttons/DeleteButton";

export default function NewTaskForm({ onSave, onCancel }: NewTaskFormProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [subtaskNames, setSubtaskNames] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);
  const [weekdays, setWeekdays] = useState<string[]>([]);

  function handleSelectedFrequency(value: string) {
    setFrequency(value);
  }

  function handleCheckedWeekdays(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    if (checked) {
      // Add the checked day to the byWeekday state if it's not already there
      if (!weekdays.includes(value)) {
        setWeekdays((prevByWeekday) => [...prevByWeekday, value]);
      }
    } else {
      // Remove the unchecked day from the byWeekday state
      setWeekdays((prevByWeekday) =>
        prevByWeekday.filter((day) => day !== value)
      );
    }
  }

  function handleUpdatedInterval(value: number) {
    setInterval(value);
  }

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
    if (
      taskName === "" ||
      frequency === null ||
      (frequency === "weekly" && weekdays.length === 0) ||
      subtaskNames.some((subtaskName) => subtaskName === "")
    ) {
      setHasErrors(true);
      return;
    }

    const weekdayMapping: { [key: string]: Weekday } = {
      MO: RRule.MO,
      TU: RRule.TU,
      WE: RRule.WE,
      TH: RRule.TH,
      FR: RRule.FR,
      SA: RRule.SA,
      SU: RRule.SU,
    };

    const rule = new RRule({
      freq: frequency === "daily" ? RRule.DAILY : RRule.WEEKLY,
      interval: interval,
      byweekday: weekdays.map((weekday) => weekdayMapping[weekday]),
      dtstart: dayjs().toDate(),
    });

    let newTask: TaskType = {
      id: `${crypto.randomUUID()}`,
      name: taskName,
      done: false,
      rrule: rule.toString(),
    };

    if (subtaskNames.length > 0) {
      newTask = {
        ...newTask,
        subtasks: subtaskNames.map((subtaskName) => ({
          taskId: newTask.id,
          subtaskId: `${crypto.randomUUID()}`,
          name: subtaskName,
          done: false,
        })),
      };
    }

    onSave(newTask);
  }

  const emptyFieldError = <p className="text-red-500">Can't be empty</p>;

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
        {hasErrors && taskName === "" && emptyFieldError}
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
                className="w-full border border-gray-300 rounded px-3 py-2 mr-2"
                value={subtaskName}
                onChange={(event) => handleSubtaskNameChange(index, event)}
              />
              <DeleteButton onDelete={() => handleRemoveSubtask(index)} />
            </div>
            {hasErrors && subtaskName === "" && emptyFieldError}
          </div>
        ))}
      <div className="mb-4 flex justify-center">
        <AddSubtaskButton onAddSubtask={handleAddSubtask} />
      </div>
      <RepetitionOptions
        frequency={frequency}
        interval={interval}
        onSelectedFrequency={handleSelectedFrequency}
        onCheckedWeekdays={handleCheckedWeekdays}
        onUpdatedInterval={handleUpdatedInterval}
      />
      <div className="flex justify-center mt-4 gap-x-1">
        <SaveButton onSave={handleSave} />
        <CancelButton onCancel={onCancel} />
      </div>
    </div>
  );
}
