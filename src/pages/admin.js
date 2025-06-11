import React, { useState, useEffect } from 'react';
import Navbar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { BarChart2 } from 'lucide-react';
import useTaskStore from '../stores/taskStore';
import Analytics from '@/components/Analytics';
import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import TaskDetail from '@/components/TaskDetail';
import filterTasks from '@/utils/filter';

export default function Admin() {
  const router = useRouter();
  const { tasks, setTasks, updateTask, typeOptions, priorityOptions, statusOptions  } = useTaskStore();

  const [sortOrder, setSortOrder] = useState('asc');
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [priorityFilterPending, setPriorityFilterPending] = useState('');
  const [statusFilterPending, setStatusFilterPending] = useState('');
  const [typeFilterPending, setTypeFilterPending] = useState('');
  const [assigneeFilterPending, setAssigneeFilterPending] = useState('');
  const [activeFilterPending, setActiveFilterPending] = useState(null);

  const [priorityFilterAll, setPriorityFilterAll] = useState('');
  const [statusFilterAll, setStatusFilterAll] = useState('');
  const [typeFilterAll, setTypeFilterAll] = useState('');
  const [assigneeFilterAll, setAssigneeFilterAll] = useState('');
  const [activeFilterAll, setActiveFilterAll] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (!username || role !== 'Manager') {
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

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleApprove = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, approval: 'Approved' };
      updateTask(updatedTask);
    }
  };

  const handlePushBack = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, approval: 'Pushback', status: 'Active' };
      updateTask(updatedTask);
    }
  };

  const pendingApprovalTasks = filterTasks(
    tasks.filter((task) => task.approval === 'Pending'),
    searchTerm,
    priorityFilterPending,
    statusFilterPending,
    typeFilterPending,
    assigneeFilterPending
  );

  const filteredTasks = filterTasks(
    tasks,
    searchTerm,
    priorityFilterAll,
    statusFilterAll,
    typeFilterAll,
    assigneeFilterAll
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <>
      <Navbar />
      <TaskDetail
        isOpen={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
        task={selectedTask}
      />
      <div className="p-4 m-14">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-violet-600">Manager Workspace</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAnalyticsOpen(true)}
              className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              <BarChart2 size={16} className="text-gray-500" />
            </button>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>

        <Analytics
          isOpen={isAnalyticsOpen}
          onClose={() => setIsAnalyticsOpen(false)}
          tasks={tasks}
        />

        <h2 className="text-md font-semibold mb-2 mt-4 text-gray-600">Pending Approvals</h2>
        <Table
          tasks={pendingApprovalTasks}
          sortOrder={sortOrder}
          handleSort={handleSort}
          activeFilter={activeFilterPending}
          setActiveFilter={setActiveFilterPending}
          setTypeFilter={setTypeFilterPending}
          typeFilter={typeFilterPending}
          typeOptions={typeOptions}
          setPriorityFilter={setPriorityFilterPending}
          priorityFilter={priorityFilterPending}
          priorityOptions={priorityOptions}
          setStatusFilter={setStatusFilterPending}
          statusFilter={statusFilterPending}
          statusOptions={statusOptions}
          setAssigneeFilter={setAssigneeFilterPending}
          assigneeFilter={assigneeFilterPending}
          handleApprove={handleApprove}
          handlePushBack={handlePushBack}
          hideActions={false}
          setSelectedTask={setSelectedTask}
          setIsTaskDetailsOpen={setIsTaskDetailsOpen}
        />

        <h2 className="text-md font-semibold mb-2 mt-4 text-gray-600">All Tasks</h2>
        <Table
          tasks={sortedTasks}
          sortOrder={sortOrder}
          handleSort={handleSort}
          activeFilter={activeFilterAll}
          setActiveFilter={setActiveFilterAll}
          setTypeFilter={setTypeFilterAll}
          typeFilter={typeFilterAll}
          typeOptions={typeOptions}
          setPriorityFilter={setPriorityFilterAll}
          priorityFilter={priorityFilterAll}
          priorityOptions={priorityOptions}
          setStatusFilter={setStatusFilterAll}
          statusFilter={statusFilterAll}
          statusOptions={statusOptions}
          setAssigneeFilter={setAssigneeFilterAll}
          assigneeFilter={assigneeFilterAll}
          hideActions={true}
          setSelectedTask={setSelectedTask}
          setIsTaskDetailsOpen={setIsTaskDetailsOpen}
        />
      </div>
    </>
  );
}