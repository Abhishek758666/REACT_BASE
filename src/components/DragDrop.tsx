import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { ColumnType } from "../types/types";

interface DragDropProps {
  onDragEnd: (result: DropResult) => void;
  getColumnTasks: (status: string) => any[];
  columns: ColumnType[];
}

const DragDrop = ({ onDragEnd, getColumnTasks, columns }: DragDropProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 text-sm justify-center max-w-[1200px] py-10">
        {columns?.map((column, i) => (
          <Column key={i} column={column} getColumnTasks={getColumnTasks} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragDrop;
