import UIModal from "../ui/uimodal";
import UIInput from "../ui/uiinput";
import UIButton from "../ui/uibutton";
import { ColumnType } from "../types/types";
import { ChangeEvent } from "react";

interface ColumnModalProps {
  onClose: () => void;
  newColumn: ColumnType | any;
  handleColumnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleColumnSubmit: () => void;
}

const ColumnModal = ({
  onClose,
  newColumn,
  handleColumnChange,
  handleColumnSubmit,
}: ColumnModalProps) => {
  const handleSubmit = () => {
    handleColumnSubmit();
    onClose();
  };
  return (
    <UIModal onClose={onClose} showAnimation={true}>
      <div className="flex flex-col gap-5 w-[25rem]">
        <h1 className="font-semibold text-xl">Add Column</h1>
        <UIInput
          label="title"
          name="title"
          onChange={handleColumnChange}
          defaultValue={newColumn.title}
        />
        <UIInput
          label="emoji"
          name="emoji"
          onChange={handleColumnChange}
          defaultValue={newColumn.emoji}
        />
        <UIInput
          label="color"
          type="color"
          name="color"
          onChange={handleColumnChange}
          defaultValue={newColumn.color}
        />
        <div className="flex gap-5">
          <UIButton type="primary" label="submit" onClick={handleSubmit} />
          <UIButton type="secondary" label="cancel" onClick={onClose} />
        </div>
      </div>
    </UIModal>
  );
};

export default ColumnModal;
