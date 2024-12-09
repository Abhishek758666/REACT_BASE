import { ChangeEvent, useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { ColumnType, TaskType } from "./types/types";
import DragDrop from "./components/DragDrop";
import Header from "./components/Header";
import { emojiRegex, InitialColumn, initialTasks } from "./utils/local";
import { addToLocalStorage, getFromLocalStorage } from "./utils/helpers";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "./lib/toastify";
import { ToastContainer } from "react-toastify";

const App = () => {
  const storedTask = getFromLocalStorage("storedTask");
  const storedColumn = getFromLocalStorage("storedColumn");

  const [tasks, setTasks] = useState<TaskType[]>(storedTask || initialTasks);
  const [columns, setColumns] = useState<ColumnType[]>(
    storedColumn || InitialColumn
  );

  const [newTask, setNewTask] = useState<{
    [k in keyof Partial<TaskType>]: string;
  }>({});
  const handleTaskChange = (
    e: ChangeEvent<HTMLInputElement> | { value: string; name: string }
  ) => {
    if ("value" in e) {
      setNewTask((prev) => ({ ...prev, [e.name]: e.value }));
    } else if ("target" in e) {
      const { value, name } = e.target;
      setNewTask((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleTaskSubmit = () => {
    if (
      !newTask?.title?.trim() ||
      !newTask?.description?.trim() ||
      !newTask?.status?.trim()
    ) {
      errorToast("All the fields are required");
      return;
    }

    const taskToAdd: TaskType = {
      id: `task-${tasks.length + 1}`,
      title: newTask.title.trim(),
      status: newTask.status.trim(),
      description: newTask.description.trim(),
    };

    setTasks((prev) => [...prev, taskToAdd]);
    successToast("Task added successfully!!");
  };

  const [newColumn, setNewColumn] = useState<{
    [k in keyof Partial<ColumnType>]: string;
  }>({});
  const handleColumnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewColumn((prev) => ({ ...prev, [name]: value }));
  };
  const handleColumnSubmit = () => {
    if (
      !newColumn?.title?.trim() ||
      !newColumn?.emoji?.trim() ||
      !newColumn?.color?.trim()
    ) {
      errorToast("All the fields are required");
      return;
    }
    const check = emojiRegex.test(newColumn?.emoji as string);
    if (!check) {
      errorToast("invalid emoji");
      return;
    }
    const columnToAdd: ColumnType = {
      title: newColumn.title || "",
      emoji: newColumn.emoji || "🎉",
      color: newColumn.color || "",
    };

    setColumns((prev) => [...prev, columnToAdd]);
    successToast("Column added successfully!!");
  };

  const generateTaskStatus = (columns: ColumnType[]) => {
    return columns.map((column) => ({
      value: column.title,
      displayValue: `${column.emoji} ${column.title}`,
    }));
  };
  const getColumnTasks = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find((task) => task.id === draggableId);

      if (!taskToMove) {
        console.error("Task not found.");
        return prevTasks;
      }

      const updatedTask = { ...taskToMove, status: destination.droppableId };

      const tasksWithoutMovedTask = prevTasks.filter(
        (task) => task.id !== draggableId
      );

      const destinationTasks = tasksWithoutMovedTask.filter(
        (task) => task.status === destination.droppableId
      );

      destinationTasks.splice(destination.index, 0, updatedTask);

      const updatedTasks = tasksWithoutMovedTask
        .filter((task) => task.status !== destination.droppableId)
        .concat(destinationTasks);

      localStorage.setItem("storedTask", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  useEffect(() => {
    addToLocalStorage("storedColumn", columns);
  }, [columns]);

  return (
    <main className="flex items-center font-font min-h-screen text-sm flex-col w-full">
      <ToastContainer />
      <Header
        newTask={newTask}
        handleTaskChange={handleTaskChange}
        handleTaskSubmit={handleTaskSubmit}
        newColumn={newTask}
        handleColumnChange={handleColumnChange}
        handleColumnSubmit={handleColumnSubmit}
        generateTaskStatus={generateTaskStatus}
        columns={columns}
      />
      <DragDrop
        columns={columns}
        getColumnTasks={getColumnTasks}
        onDragEnd={onDragEnd}
      />
    </main>
  );
};

export default App;
