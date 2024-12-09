import { ChangeEvent, useEffect, useState } from "react";
import UIButton from "../ui/uibutton";
import TaskModal from "./TaskModal";
import ColumnModal from "./ColumnModal";
import { ColumnType, SelectOptionType, TaskType } from "../types/types";

interface HeaderProps {
  generateTaskStatus: (column: ColumnType[]) => SelectOptionType[];
  columns: ColumnType[];

  newTask: TaskType | any;
  handleTaskChange: (
    e: ChangeEvent<HTMLInputElement> | { value: string; name: string }
  ) => void;
  handleTaskSubmit: () => void;

  newColumn: ColumnType | any;
  handleColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColumnSubmit: () => void;
}

const Header = ({
  generateTaskStatus,
  columns,
  newTask,
  handleTaskChange,
  handleTaskSubmit,
  newColumn,
  handleColumnChange,
  handleColumnSubmit,
}: HeaderProps) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [taskStatusOptions, setTaskStatusOptions] = useState<
    SelectOptionType[] | []
  >([]);

  useEffect(() => {
    setTaskStatusOptions(generateTaskStatus(columns));
  }, [columns]);

  return (
    <header className="w-full flex justify-end h-20 items-center px-40 shadow-sm">
      <div className="left flex gap-5">
        <UIButton
          label={"Add Task"}
          type="primary"
          onClick={() => setShowAddTaskModal(true)}
        />
        <UIButton
          label={"Add Columns"}
          type="secondary"
          onClick={() => setShowAddColumnModal(true)}
        />
      </div>
      <div className="right"></div>
      {showAddTaskModal && (
        <TaskModal
          taskStatusOptions={taskStatusOptions}
          onClose={() => setShowAddTaskModal(false)}
          newTask={newTask}
          handleTaskChange={handleTaskChange}
          handleTaskSubmit={handleTaskSubmit}
        />
      )}
      {showAddColumnModal && (
        <ColumnModal
          onClose={() => setShowAddColumnModal(false)}
          newColumn={newColumn}
          handleColumnChange={handleColumnChange}
          handleColumnSubmit={handleColumnSubmit}
        />
      )}
    </header>
  );
};

export default Header;
