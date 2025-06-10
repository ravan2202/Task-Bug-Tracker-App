import React from 'react';

export default function TaskDetail({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background fade */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white p-6 rounded shadow-md w-96 z-50">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Task Details</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Type:</strong> {task.type}</p>
          <p><strong>Project:</strong> {task.project}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Assignee:</strong> {task.assignee}</p>
          <p><strong>Created Date:</strong> {task.createdAt}</p>
          <p><strong>Time Spent:</strong> {task.timeSpent || '00:00:00'}</p>
          <p><strong>Description:</strong> {task.description}</p>
        </div>
      </div>
    </div>
  );
}