import UIModal from "../ui/uimodal";
import UIInput from "../ui/uiinput";
import UIButton from "../ui/uibutton";
import UISelect from "../ui/uiselect";
import { SelectOptionType, TaskType } from "../types/types";
import { ChangeEvent } from "react";

interface TaskModalProps {
  onClose: () => void;
  taskStatusOptions: SelectOptionType[];
  newTask: TaskType | any;
  handleTaskChange: (
    e: ChangeEvent<HTMLInputElement> | { value: string; name: string }
  ) => void;
  handleTaskSubmit: () => void;
}

const TaskModal = ({
  onClose,
  newTask,
  handleTaskChange,
  handleTaskSubmit,
  taskStatusOptions,
}: TaskModalProps) => {
  const handleSubmit = () => {
    handleTaskSubmit();
    onClose();
  };
  return (
    <UIModal onClose={onClose} showAnimation={true}>
      <div className="flex flex-col gap-5 w-[25rem]">
        <h1 className="font-semibold text-xl">Add Task</h1>
        <UIInput
          label="title"
          name="title"
          defaultValue={newTask.title}
          isRequired
          onChange={handleTaskChange}
        />
        <UIInput
          defaultValue={newTask.description}
          label="description"
          name="description"
          isRequired
          onChange={handleTaskChange}
        />
        <UISelect
          defaultValue={newTask.status}
          label="status"
          name="status"
          options={taskStatusOptions}
          isRequired
          onChange={(value) => handleTaskChange({ value, name: "status" })}
        />
        <div className="flex gap-5">
          <UIButton type="primary" label="submit" onClick={handleSubmit} />
          <UIButton type="secondary" label="cancel" onClick={onClose} />
        </div>
      </div>
    </UIModal>
  );
};

export default TaskModal;
