import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { ColumnType } from "../types/types";

interface ColumnProps {
  column: ColumnType;
  getColumnTasks: (status: string) => any[];
}

const Column = ({ column, getColumnTasks }: ColumnProps) => {
  const tasks = getColumnTasks(column.title as string);

  return (
    <Droppable droppableId={column?.title as string}>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className="w-full rounded-lg h-max"
        >
          <h2 className="text-lg font-bold capitalize">
            {column.emoji}
            {column.title}
          </h2>
          <ul className="mt-4 bg-gray-100 p-3 rounded-md shadow-lg h-max">
            {tasks.map((task: any, index: number) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                color={column.color}
              />
            ))}
            {droppableProvided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
