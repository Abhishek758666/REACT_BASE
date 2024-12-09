import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskType } from "../types/types";

interface DroppableProps {
  column: string;
  getColumnTasks: (status: string) => any[];
}

const CDroppable = ({ column, getColumnTasks }: DroppableProps) => {
  return (
    <Droppable key={column} droppableId={column}>
      {(droppableProvided) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className="w-1/3 bg-gray-100 p-4 rounded-lg"
        >
          <h2 className="text-xl font-bold capitalize">{column}</h2>
          <ul className="mt-4">
            {getColumnTasks(column).map((task: TaskType, index: number) => (
              <Draggable
                key={task.id}
                draggableId={task.id as string}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-2 mb-2 border rounded-lg shadow-md"
                  >
                    {task.title}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};

export default CDroppable;
