import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Edit2, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import PropTypes from 'prop-types';
import apiService from '../services/api';
import TaskItem from './TaskItem'; // Assuming you have a TaskItem component

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
    }
  };

  const deleteTask = async (taskId) => {
    try { 
      await apiService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again later.');
    }
  };
  
  const updateTask = async (taskId, updatedTask) => {
    try {
      const updatedData = await apiService.updateTask(taskId, updatedTask);
      setTasks(tasks.map(task => task.id === taskId ? updatedData : task));
      setEditingTask(null); 
    } catch (err) { 
      setError('Failed to update task. Please try again later.');
    } 
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setExpandedTaskId(task.id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(editingTask.id, editingTask);
    } catch (err) {
      setError('Failed to update task. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6">
        {tasks.map(task => (
          <div key={task.id}>
            {editingTask && editingTask.id === task.id ? (
              <form onSubmit={handleEditSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingTask.name}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editingTask.description}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={editingTask.startDate}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={editingTask.endDate}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={editingTask.status}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <TaskItem
                task={task}
                onDelete={deleteTask}
                onEdit={handleEdit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;