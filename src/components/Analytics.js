// src/components/AnalyticsModal.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { subDays, format, eachDayOfInterval } from 'date-fns';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function AnalyticsModal({ isOpen, onClose, tasks }) {
  if (!isOpen) return null;

  const computeConcurrentTasks = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 6); // last 7 days
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
      const dayStart = day.setHours(0, 0, 0, 0);
      const dayEnd = day.setHours(23, 59, 59, 999);

      const count = tasks.filter((task) => {
        const activeStart = task.activeStartTime || new Date(task.createdAt).getTime();
        const closedAt = task.closedAt || Date.now();

        return activeStart <= dayEnd && closedAt >= dayStart;
      }).length;

      return {
        date: format(day, 'MM-dd'),
        count,
      };
    });
  };

  const data = computeConcurrentTasks();

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Concurrent Tasks',
        data: data.map((d) => d.count),
        fill: false,
        borderColor: '#955cff',
        tension: 0.3,
      },
    ],
  };

 const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Tasks',
      },
      ticks: { stepSize: 1 },
    },
  },
};

  return (
   <div className="fixed inset-0 flex items-center justify-center z-50">
  <div
    className="absolute inset-0 bg-black opacity-30"
    onClick={onClose}
  ></div>
  <div className="relative bg-white p-4 rounded shadow-md w-[60%] max-w-4xl z-50">
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
    >
      ✕
    </button>
    <h2 className="text-lg font-bold mb-2">Concurrent Tasks</h2>
    <div className="h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  </div>
</div>
  );
}