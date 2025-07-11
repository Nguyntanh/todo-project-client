import React from 'react';

const ViewTask = ({ tasks, projects, selectedTaskId, user, error, logout, setView, handleEditTask }) => {
  const task = tasks.find((t) => t._id === selectedTaskId);
  const project = task ? projects.find((p) => p._id === task.projectId) : null;

  if (!task) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>View Task</h2>
          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => setView('tasks')}
            >
              Back to Tasks
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="alert alert-danger">Task not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Details</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('tasks')}
          >
            Back to Tasks
          </button>
          {(task.createdBy.toString() === user.userId || user.role === 'admin') && (
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEditTask(task)}
            >
              Edit Task
            </button>
          )}
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4">
        <h3>{task.title}</h3>
        <p><strong>Description:</strong> {task.description || 'No description'}</p>
        <p><strong>Project:</strong> {project?.name || 'Unknown'}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
        <p><strong>Assigned To:</strong> {task.assignedTo?.name || 'Not assigned'}</p>
        <p><strong>Created By:</strong> {task.createdBy.name}</p>
        <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewTask;