import React, { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose, onCreate }) {
  const [project, setProject] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Task');
  const [status, setStatus] = useState('Open');
  const [assignee, setAssignee] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { project, title, type, status, assignee, createdDate, description };
    onCreate(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Faded background */}
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded shadow-md w-96 z-50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row 1: Project, Title */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Project</label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                required
              >
                <option value="">Select Project</option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>

          {/* Row 2: Type, Status */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="Task">Task</option>
                <option value="Bug">Bug</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          {/* Row 3: Assignee, Created Date */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                required
              >
                <option value="">Select Assignee</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Created Date</label>
              <input
                type="date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}