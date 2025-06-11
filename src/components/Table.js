import React, { useRef } from 'react';
import { Clock, CheckCircle, Undo2 } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import RealTimeTimer from './RealTimeTimer';
import { FilterButton, FilterMenu, toggleFilter } from '../utils/helper';

export default function Table({
  tasks,
  sortOrder,
  handleSort,
  activeFilter,
  setActiveFilter,
  setTypeFilter,
  typeOptions,
  setPriorityFilter,
  priorityOptions,
  setStatusFilter,
  statusOptions,
  setAssigneeFilter,
  setSelectedTask,
  setIsTaskDetailsOpen,
  setEditingTask,
  setIsModalOpen,
  deleteTask,
  handleApprove,
  handlePushBack,
  hideActions = false,
}) {

  const containerRef = useRef();
  useOutsideClick(containerRef, () => setActiveFilter(null));

  return (
    
    <div ref={containerRef} className="relative overflow-x-auto shadow rounded">
      <table className="min-w-full text-sm text-left text-gray-600 bg-white border border-gray-200">
        <thead className="text-s text-gray-700 bg-gray-50">
          <tr>
            <th className="px-6 py-3">Unique ID</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3 relative">
              Type
              <FilterButton
                active={activeFilter === 'type'}
                onClick={() => toggleFilter('type', setActiveFilter)}
              />
              {activeFilter === 'type' && (
                <FilterMenu
                  options={typeOptions}
                  onSelect={setTypeFilter}
                  onClear={() => setTypeFilter('')}
                  close={() => setActiveFilter(null)}
                />
              )}
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={handleSort}>
              Created Date {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th className="px-6 py-3 relative">
              Priority
              <FilterButton
                active={activeFilter === 'priority'}
                onClick={() => toggleFilter('priority', setActiveFilter)}
              />
              {activeFilter === 'priority' && (
                <FilterMenu
                  options={priorityOptions}
                  onSelect={setPriorityFilter}
                  onClear={() => setPriorityFilter('')}
                  close={() => setActiveFilter(null)}
                />
              )}
            </th>
            <th className="px-6 py-3 relative">
              Status
              <FilterButton
                active={activeFilter === 'status'}
                onClick={() => toggleFilter('status', setActiveFilter)}
              />
              {activeFilter === 'status' && (
                <FilterMenu
                  options={statusOptions}
                  onSelect={setStatusFilter}
                  onClear={() => setStatusFilter('')}
                  close={() => setActiveFilter(null)}
                />
              )}
            </th>
            <th className="px-6 py-3 relative">
              Assignee
              <FilterButton
                active={activeFilter === 'assignee'}
                onClick={() => toggleFilter('assignee', setActiveFilter)}
              />
              {activeFilter === 'assignee' && (
                <FilterMenu
                  options={[...new Set(tasks.map((t) => t.assignee))]}
                  onSelect={setAssigneeFilter}
                  onClear={() => setAssigneeFilter('')}
                  close={() => setActiveFilter(null)}
                />
              )}
            </th>
            <th className="px-6 py-3">Time Spent</th>
            {!hideActions && <th className="px-6 py-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={hideActions ? 8 : 9} className="px-6 py-4 text-center text-gray-500">No tasks found.</td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <tr key={task.id} className={idx % 2 === 0 ? 'bg-white ' : 'bg-gray-50'}>
                <td className="px-6 py-4 font-medium text-gray-900">{task.id}</td>
                <td
                  className="px-6 py-4 text-indigo-600 cursor-pointer hover:underline"
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
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">{task.assignee}</td>
                <td className="px-6 py-4">
                  {task.status === 'Active' && task.activeStartTime ? (
                    <RealTimeTimer startTime={Number(task.activeStartTime)} />
                  ) : task.timeSpent ? (
                    task.timeSpent
                  ) : (
                    <Clock size={16} className="text-gray-400" />
                  )}
                </td>
                {!hideActions && (
                  <td className="px-6 py-4 text-center relative">
                    {handleApprove && handlePushBack && task.approval === 'Pending' ? (
                      <div className="flex justify-between items-center px-2">
                        <button onClick={() => handleApprove(task.id)} className="text-green-600 hover:text-green-800">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => handlePushBack(task.id)} className="text-orange-600 hover:text-orange-800">
                          <Undo2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setActiveFilter(activeFilter === task.id ? null : task.id)}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          &#8942;
                        </button>
                        {activeFilter === task.id && (
                          <div
                            className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-28"
                          >
                            <div
                              className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setEditingTask(task);
                                setIsModalOpen(true);
                                setActiveFilter(null);
                              }}
                            >
                              Update
                            </div>
                            <div
                              className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                deleteTask(task.id);
                                setActiveFilter(null);
                              }}
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}