import { Draggable } from "@hello-pangea/dnd";
import { TaskType } from "../types/types";

interface TaskProps {
  task: TaskType;
  index: number;
  color: string;
}

const Task = ({ task, index, color }: TaskProps) => {
  console.log(color);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 rounded-lg shadow-md text-white`}
          style={{
            backgroundColor: color,
            ...provided.draggableProps.style,
          }}
          onClick={() => console.log("i am clickable")}
        >
          <h3 className="font-bold text-md">{task.title}</h3>
          <p className="tracking-normal leading-tight pt-3 text-sm">
            {task.description}
          </p>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
