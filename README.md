# Task Tracker App

This is a task management application built using **Next.js**, **Zustand** for state management, and **Tailwind CSS** for styling. It allows developers to manage their tasks efficiently with real-time tracking, sorting, filtering, and analytics.

---

## 🚀 Highlights

- **User Authentication**  
  - Simple login mechanism using local storage (`username` and `role`).  

  **Login Credentials:**
  - **Username**: Developer  
    **Password**: Developer@123
  - **Username**: Manager  
    **Password**: Manager@123

- **Task Management**  
  - Add, update, and delete tasks.  
  - Track tasks with status changes: `Assigned`, `Active`, `Close`, and `Re-Open`.  
  - Real-time timer (`RealTimeTimer`) for tasks marked as `Active`.

- **Dynamic Filtering & Search**  
  - Filter tasks by **type**, **priority**, **status**, and **assignee**.  
  - Search for tasks by **title**, **description**, **assignee**, or **project**.

- **Analytics Dashboard**  
  - Displays a **line chart** (`Analytics`) showing the number of concurrent active tasks for the last 7 days.

- **Responsive & Mobile-Friendly Design**  
  - Clean, consistent layout using **Tailwind CSS**.  
  - Fully responsive design across desktop.

---

## 🛠️ Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.  
- **Zustand**: Lightweight state management for tasks, filters, and options.  
- **Tailwind CSS**: Utility-first CSS framework.  
- **Chart.js** (via `react-chartjs-2`): For rendering analytics charts.  
- **Lucide-react**: Beautiful icons throughout the app.

---

## 💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app
npm install
npm run dev