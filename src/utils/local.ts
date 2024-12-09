import { ColumnType, TaskType } from "../types/types";

export const initialTasks: TaskType[] = [
  {
    id: "task-1",
    title: "Complete the project report",
    status: "todo",
    description:
      "Write and submit the final report for the project, including all the necessary details and data analysis.",
  },
  {
    id: "task-2",
    title: "Fix bugs in the user authentication flow",
    status: "progress",
    description:
      "Investigate and resolve issues with login and registration features.",
  },
  {
    id: "task-3",
    title: "Design homepage layout",
    status: "completed",
    description:
      "Create a clean and responsive homepage design for the website.",
  },
  {
    id: "task-4",
    title: "Update documentation",
    status: "todo",
    description:
      "Ensure that all project documentation is up-to-date and covers recent changes.",
  },
  {
    id: "task-5",
    title: "Prepare demo for client meeting",
    status: "progress",
    description:
      "Create a demo showcasing the core features of the application for the upcoming client meeting.",
  },
  {
    id: "task-6",
    title: "Implement search functionality",
    status: "todo",
    description:
      "Develop the search functionality for the website, allowing users to search by keywords.",
  },
  {
    id: "task-7",
    title: "Review pull requests",
    status: "progress",
    description:
      "Review the open pull requests for quality and correctness, and provide feedback.",
  },
  {
    id: "task-8",
    title: "Add unit tests for new features",
    status: "todo",
    description:
      "Write unit tests for the recently added features to ensure functionality and code quality.",
  },
  {
    id: "task-9",
    title: "Optimize application performance",
    status: "progress",
    description:
      "Analyze and optimize performance bottlenecks in the application, particularly in rendering and API calls.",
  },
  {
    id: "task-10",
    title: "Conduct user testing",
    status: "completed",
    description:
      "Organize and conduct user testing sessions to gather feedback on the user interface and experience.",
  },
];
export const InitialColumn: ColumnType[] = [
  { title: "todo", emoji: "📝", color: "#457B9D" },
  { title: "progress", emoji: "⌛", color: "#E9C46A" },
  { title: "completed", emoji: "✅", color: "#2A9D8F" },
];

export const emojiRegex =
  /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|[\u203C-\u3299]|[\uDC00-\uDFFF])/gu;
