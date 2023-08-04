import dayjs from "dayjs";
import { ChangeEvent, useContext, useState } from "react";
import { RRule, Weekday } from "rrule";

import { FetchResult, useMutation } from "@apollo/client";

import { SessionContext } from "../../context/SessionContext";
import { CREATE_SUBTASKS } from "../../mutations/createSubtasks";
import { CREATE_TASK } from "../../mutations/createTask";
import { NewTaskFormProps } from "../../types/common";
import AddSubtaskButton from "../buttons/AddSubtaskButton";
import CancelButton from "../buttons/CancelButton";
import DeleteButton from "../buttons/DeleteButton";
import SaveButton from "../buttons/SaveButton";
import TextInput from "../inputs/TextInput";
import RepetitionOptions from "./RepetitionOptions";

interface InsertTasksResult {
  insertIntotasksCollection: {
    records: {
      id: string;
      name: string;
      rrule: string;
    }[];
  };
}

interface InsertSubtasksResult {
  insertIntosubtasksCollection: {
    records: {
      task_id: string;
      id: string;
      name: string;
    }[];
  };
}

export default function NewTaskForm({ onSave, onCancel }: NewTaskFormProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [subtaskNames, setSubtaskNames] = useState<string[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [interval, setInterval] = useState<number>(1);
  const [weekdays, setWeekdays] = useState<string[]>([]);

  const session = useContext(SessionContext);
  const [createTask] = useMutation(CREATE_TASK);
  const [createSubtasks] = useMutation(CREATE_SUBTASKS);

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
    const isInvalidTask =
      taskName === "" ||
      frequency === null ||
      (frequency === "weekly" && weekdays.length === 0) ||
      subtaskNames.some((subtaskName) => subtaskName === "");

    if (isInvalidTask) {
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

    let taskRecord:
      | {
          id: string;
          name: string;
          rrule: string;
        }
      | undefined = undefined;

    createTask({
      variables: {
        user_id: session?.user.id,
        name: taskName,
        rrule: rule.toString(),
      },
    })
      .then((tasksData: FetchResult<InsertTasksResult>) => {
        const task_id = tasksData.data?.insertIntotasksCollection.records[0].id;
        taskRecord = tasksData.data?.insertIntotasksCollection.records[0];

        if (subtaskNames.length === 0) {
          return undefined;
        }

        const subtasks = subtaskNames.map((subtaskName) => ({
          task_id: task_id,
          name: subtaskName,
          user_id: session?.user.id,
        }));

        return createSubtasks({
          variables: { subtasks },
        });
      })
      .then((subtasksData: FetchResult<InsertSubtasksResult> | undefined) => {
        const subtaskRecords =
          subtasksData?.data?.insertIntosubtasksCollection.records.map(
            (record) => ({
              taskId: record.task_id,
              subtaskId: record.id,
              name: record.name,
              done: [],
            })
          ) || [];

        if (!taskRecord) {
          setHasErrors(true);
          return;
        }

        onSave({
          id: taskRecord.id,
          name: taskRecord.name,
          done: [],
          rrule: taskRecord.rrule,
          subtasks: subtaskRecords,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const emptyFieldError = <p className="text-red-500">Can't be empty</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">New Task</h1>
      <div className="mb-4">
        <label htmlFor="taskName" className="block font-medium mb-1">
          Task Name:
        </label>
        <TextInput
          id={"taskName"}
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
            <div className="flex gap-x-1">
              <TextInput
                id={`subtaskName-${index}`}
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
