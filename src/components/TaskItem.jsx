import React from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p className="text-sm text-gray-600">{task.description}</p> {/* Display description */}
      <p className="text-sm text-gray-600">Start Date: {task.startDate}</p>
      <p className="text-sm text-gray-600">End Date: {task.endDate}</p>
      <p className="text-sm text-gray-600">Status: {task.status}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, // Add description prop type
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TaskItem;