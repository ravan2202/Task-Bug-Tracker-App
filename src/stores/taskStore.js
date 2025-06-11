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
        if (task.id !== updatedTask.id) return task;

        const newTask = { ...task, ...updatedTask };

        if (updatedTask.status === 'Active' && task.status !== 'Active') {
           newTask.activeStartTime = new Date(updatedTask.createdAt).getTime();
          newTask.closedAt = null; 
        }
         if (updatedTask.status === 'Close' && task.status === 'Active') {
        newTask.closedAt = Date.now();
        const startTime = task.activeStartTime || Date.now();
        const diff = Date.now() - startTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        newTask.timeSpent = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        newTask.activeStartTime = null; 
        newTask.approval = 'Pending';
      }

        return newTask;
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
  projectOptions: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
  assigneeOptions: ['Rahul Sharma', 'Priya Verma', 'Amit Kumar', 'Anjali Singh', 'Rohit Gupta'],
  priorityOptions: ['High', 'Medium', 'Low'],
  statusOptions: ['Assigned','Active','Close','Re-Open'],
  typeOptions: ['Task', 'Bug'],
}));

export default useTaskStore;