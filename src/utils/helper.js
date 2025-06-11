// helper.js

import { ChevronDown } from 'lucide-react';
import React from 'react';

// Button to toggle filter menus
export const FilterButton = ({ active, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`ml-1 inline-flex items-center ${active ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-800'}`}
  >
    <ChevronDown size={14} />
  </button>
);

// Filter menu (dropdown) with options
export const FilterMenu = ({ options, onSelect, onClear, close }) => (
  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow z-10 w-32">
    <div
      className="p-2 text-sm cursor-pointer hover:bg-gray-100"
      onClick={() => {
        onClear();
        close();
      }}
    >
      All
    </div>
    {options.map((opt) => (
      <div
        key={opt}
        className="p-2 text-sm cursor-pointer hover:bg-gray-100"
        onClick={() => {
          onSelect(opt);
          close();
        }}
      >
        {opt}
      </div>
    ))}
  </div>
);

// Toggle filter type
export const toggleFilter = (type, setActiveFilter) => {
  setActiveFilter((prev) => (prev === type ? null : type));
};