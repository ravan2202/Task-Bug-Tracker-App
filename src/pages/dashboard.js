import React, { useState,useEffect,useRef } from 'react';
import Navbar from '@/components/NavBar';
import { useRouter } from 'next/router';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../stores/taskStore';
import TaskDetail from '@/components/TaskDetail';
import useOutsideClick from '@/hooks/useOutsideClick';
import SearchBar from '@/components/SearchBar';
import { BarChart2 } from 'lucide-react';
import Analytics from '../components/Analytics';
import Table from '@/components/Table';
import filterTasks from '@/utils/filter';
import mockTasks from '@/utils/mockData';

export default function Dashboard() {

  const router = useRouter();
  const { tasks } = useTaskStore();
  // const { setTasks } = useTaskStore();
  const { deleteTask, typeOptions, priorityOptions, statusOptions } = useTaskStore();

  const [sortOrder, setSortOrder] = useState('asc');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('')
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (!username || role !== 'Developer') {
      router.push('/');
    }
  }, []);

    useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        }
    }
    }, []);
    const { setTasks } = useTaskStore();
    useEffect(() => {
      setTasks(mockTasks);
    }, []);

    const popoverRef = useRef();
    useOutsideClick(popoverRef, () => setActiveFilter(null));

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredTasks = filterTasks(
    tasks,
    searchTerm,
    priorityFilter,
    statusFilter,
    typeFilter,
    assigneeFilter
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });


  return (
    <>
    <Navbar/>
     <div className="p-4 m-14">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-violet-600">Developer Workspace</h1>
        <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
            <button
          onClick={() => setIsAnalyticsOpen(true)}
          className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
          <BarChart2 size={16} className="text-gray-500" />
          </button>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
          onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
          + Add
          </button>
        </div>
        </div>
        <Analytics
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        tasks={tasks}
        />
        <TaskDetail
        isOpen={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
        task={selectedTask}
        />
        <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTask={editingTask} 
        />
      </div>
       <h2 className="text-md font-semibold mb-2 mt-4 text-gray-600">All Tasks</h2>
        <Table
        tasks={sortedTasks}
        sortOrder={sortOrder}
        handleSort={handleSort}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setTypeFilter={setTypeFilter}
        typeFilter={typeFilter}
        typeOptions={typeOptions}
        setPriorityFilter={setPriorityFilter}
        priorityFilter={priorityFilter}
        priorityOptions={priorityOptions}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        statusOptions={statusOptions}
        setAssigneeFilter={setAssigneeFilter}
        assigneeFilter={assigneeFilter}
        setSelectedTask={setSelectedTask}
        setIsTaskDetailsOpen={setIsTaskDetailsOpen}
        setEditingTask={setEditingTask}
        setIsModalOpen={setIsModalOpen}
        deleteTask={deleteTask}
      />
    </div>
    </>
   
  );
}