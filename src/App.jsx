// src/App.jsx
import { useState } from 'react'
import TaskManagement from './components/TaskManagement'
import CreateTask from './components/CreateTask'

function App() {
  const [activeTab, setActiveTab] = useState('list') // 'list' or 'create'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Management
          </h1>
        </div>
      </header>

      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-4 px-1 ${
                activeTab === 'list'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              View Tasks
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-4 px-1 ${
                activeTab === 'create'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              Create Task
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'list' ? (
          <TaskManagement />
        ) : (
          <CreateTask onTaskCreated={() => setActiveTab('list')} />
        )}
      </main>
    </div>
  )
}

export default App