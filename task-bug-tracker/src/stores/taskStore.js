import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: Math.floor(10000 + Math.random() * 90000) }, // Always new 5-digit ID
      ],
    })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  projectOptions: ['Project A', 'Project B'],
  assigneeOptions: ['John Doe', 'Jane Smith', 'Bob Brown'],
  priorityOptions: ['High', 'Medium', 'Low'],
  statusOptions: ['Open', 'In Progress', 'Close'],
  typeOptions: ['Task', 'Bug'],
}));

export default useTaskStore;