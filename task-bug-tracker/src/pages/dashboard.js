import React, { useState,useEffect,useRef } from 'react';
import Navbar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { ChevronDown } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../stores/taskStore';
import TaskDetail from '@/components/TaskDetail';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Dashboard() {

  const router = useRouter();
  const { tasks } = useTaskStore();
  const { setTasks } = useTaskStore();
  const { deleteTask } = useTaskStore();

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

    const popoverRef = useRef();
    useOutsideClick(popoverRef, () => setActiveFilter(null));

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (priorityFilter === '' || task.priority === priorityFilter) &&
      (statusFilter === '' || task.status === statusFilter)&&
       (typeFilter === '' || task.type === typeFilter)&&
       (assigneeFilter === '' || task.assignee === assigneeFilter)
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const typeOptions = ['Task', 'Bug'];
  const priorityOptions = ['High', 'Medium', 'Low'];
  const statusOptions = ['Active','Close'];

  return (
    <>
    <Navbar/>
     <div className="p-4 m-14">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Developer Workspace</h1>
        <button
        onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
        + Add
        </button>
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Unique ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3 relative">
                Type
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilter((prev) => (prev === 'type' ? null : 'type'));
                    }}
                    className="ml-1 inline-flex items-center text-gray-500 hover:text-gray-800"
                >
                    <ChevronDown size={14} />
                </button>
                {activeFilter === 'type' && (
                    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-32">
                    <div
                        className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                        setTypeFilter('');
                        setActiveFilter(null);
                        }}
                    >
                        All
                    </div>
                    {typeOptions.map((option) => (
                        <div
                        key={option}
                        className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            setTypeFilter(option);
                            setActiveFilter(null);
                        }}
                        >
                        {option}
                        </div>
                    ))}
                    </div>
                )}
              </th>

              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={handleSort}
              >
                Created Date {sortOrder === 'asc' ? '▲' : '▼'}
              </th>

              <th scope="col" className="px-6 py-3 relative">
                Priority
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilter((prev) =>
                      prev === 'priority' ? null : 'priority'
                    );
                  }}
                  className="ml-1 inline-flex items-center text-gray-500 hover:text-gray-800"
                >
                  <ChevronDown size={14} />
                </button>
                {activeFilter === 'priority' && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-32">
                    <div
                      className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setPriorityFilter('');
                        setActiveFilter(null);
                      }}
                    >
                      All
                    </div>
                    {priorityOptions.map((option) => {
                      const lower = option.toLowerCase();
                      const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
                      return (
                        <div
                          key={option}
                          className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setPriorityFilter(option);
                            setActiveFilter(null);
                          }}
                        >
                          {capitalized}
                        </div>
                      );
                    })}
                  </div>
                )}
              </th>

              <th scope="col" className="px-6 py-3 relative">
                Status
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilter((prev) =>
                      prev === 'status' ? null : 'status'
                    );
                  }}
                  className="ml-1 inline-flex items-center text-gray-500 hover:text-gray-800"
                >
                  <ChevronDown size={14} />
                </button>
              {activeFilter === 'status' && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-32">
                <div
                  className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setStatusFilter('');
                    setActiveFilter(null);
                  }}
                >
                  All
                </div>
                {statusOptions.map((option) => {
                  const lower = option.toLowerCase();
                  const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
                  return (
                    <div
                      key={option}
                      className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setStatusFilter(option);
                        setActiveFilter(null);
                      }}
                    >
                      {capitalized}
                    </div>
                  );
                })}
              </div>
            )}
              </th>

            <th scope="col" className="px-6 py-3 relative">
              Assignee
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFilter((prev) => (prev === 'assignee' ? null : 'assignee'));
                }}
                className="ml-1 inline-flex items-center text-gray-500 hover:text-gray-800"
              >
                <ChevronDown size={14} />
              </button>
              {activeFilter === 'assignee' && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-32">
                  <div
                    className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setAssigneeFilter('');
                      setActiveFilter(null);
                    }}
                  >
                    All
                  </div>
                  {[...new Set(tasks.map((task) => task.assignee))].map((assignee) => (
                    <div
                      key={assignee}
                      className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setAssigneeFilter(assignee);
                        setActiveFilter(null);
                      }}
                    >
                      {assignee}
                    </div>
                  ))}
                </div>
              )}
            </th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedTasks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  No tasks found.
                </td>
              </tr>
            ) : (
              sortedTasks.map((task, idx) => (
                <tr
                  key={task.id}
                  className={
                    idx % 2 === 0
                      ? 'bg-white border-b border-gray-200'
                      : 'bg-gray-50 border-b border-gray-200'
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {task.id}
                  </th>
                  <td
                    className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailsOpen(true);
                    }}
                    >
                    {task.title}
                    </td>
                  <td className="px-6 py-4">{task.type}</td>
                  <td className="px-6 py-4">{task.createdAt}</td>
                  <td className="px-6 py-4">
                    <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'}
                        `}
                    >
                        {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.status}</td>
                  <td className="px-6 py-4">{task.assignee}</td>
              <td className="px-6 py-4 text-center relative">
                <button
                    onClick={() => {
                    setActiveFilter(task.id === activeFilter ? null : task.id);
                    }}
                    className="text-gray-500 hover:text-gray-800"
                >
                    &#8942;
                </button>
                {activeFilter === task.id && (
                    <div ref={popoverRef} className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-28">
                    <div
                        className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                        setActiveFilter(null);
                        }}
                    >
                        Update
                    </div>
                    <div
                        className="p-2 text-sm font-normal cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                        deleteTask(task.id);
                        setActiveFilter(null);
                        }}
                    >
                        Delete
                    </div>
                    </div>
                )}
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
   
  );
}