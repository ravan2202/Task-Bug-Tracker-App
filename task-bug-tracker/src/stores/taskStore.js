import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => {
      const updatedTasks = [
        ...state.tasks,
        { ...task, id: Math.floor(10000 + Math.random() * 90000) },
      ];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  updateTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  projectOptions: ['Project A', 'Project B'],
  assigneeOptions: ['John Doe', 'Jane Smith', 'Bob Brown'],
  priorityOptions: ['High', 'Medium', 'Low'],
  statusOptions: ['Active','Close'],
  typeOptions: ['Task', 'Bug'],
}));

export default useTaskStore;