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
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        // If moving to Active, store activeStartTime
        if (updatedTask.status === 'Active' && task.status !== 'Active') {
        updatedTask.activeStartTime = Date.now();
        updatedTask.closedAt = Date.now();
        }

        // If moving to Close, calculate timeSpent in HH:MM:SS
        if (updatedTask.status === 'Close' && task.status === 'Active') {
          const startTime = task.activeStartTime ? task.activeStartTime : Date.now();
          const diff = Date.now() - startTime;

          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          updatedTask.timeSpent = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          updatedTask.activeStartTime = null;
        }
      }
      return task.id === updatedTask.id ? updatedTask : task;
    });

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
  statusOptions: ['Assigned','Active','Close'],
  typeOptions: ['Task', 'Bug'],
}));

export default useTaskStore;