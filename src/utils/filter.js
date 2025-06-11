const filterTasks = (
  tasks,
  searchTerm = '',
  priorityFilter = '',
  statusFilter = '',
  typeFilter = '',
  assigneeFilter = ''
) => {
  const lowerSearchTerm = searchTerm.toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(lowerSearchTerm) ||
      (task.description && task.description.toLowerCase().includes(lowerSearchTerm)) ||
      task.assignee.toLowerCase().includes(lowerSearchTerm) ||
      task.project.toLowerCase().includes(lowerSearchTerm) ||
      task.id.toString().includes(lowerSearchTerm);

    return (
      (priorityFilter === '' || task.priority === priorityFilter) &&
      (statusFilter === '' || task.status === statusFilter) &&
      (typeFilter === '' || task.type === typeFilter) &&
      (assigneeFilter === '' || task.assignee === assigneeFilter) &&
      (lowerSearchTerm === '' || matchesSearch)
    );
  });
};

export default filterTasks;