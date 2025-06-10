import React, { useState, useEffect } from 'react';
import useTaskStore from '../stores/taskStore';

export default function TaskForm({ isOpen, onClose, editingTask }) {
  const {
    addTask,
    updateTask,
    projectOptions,
    assigneeOptions,
    priorityOptions,
    statusOptions,
    typeOptions,
  } = useTaskStore();

  const [project, setProject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [createdDate, setCreatedDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setProject(editingTask.project);
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setAssignee(editingTask.assignee);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setType(editingTask.type);
      setCreatedDate(editingTask.createdAt);
    } else {
      setProject('');
      setTitle('');
      setDescription('');
      setAssignee('');
      setPriority('');
      setStatus('');
      setType('');
      setCreatedDate('');
    }
  }, [editingTask]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      project,
      title,
      description,
      assignee,
      priority,
      status,
      type,
      createdAt: createdDate,
    };

    if (editingTask) {
      taskData.id = editingTask.id;
      updateTask(taskData);
    } else {
      addTask(taskData);
    }

    setProject('');
    setTitle('');
    setDescription('');
    setAssignee('');
    setPriority('');
    setStatus('');
    setType('');
    setCreatedDate('');

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-6 rounded shadow-md w-96 z-50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select</option>
              {projectOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select</option>
              {priorityOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select</option>
              {typeOptions.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select</option>
              {assigneeOptions.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select</option>
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <input
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
            >
              {editingTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}