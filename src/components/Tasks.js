import React from 'react';

const Tasks = ({
  user,
  tasks,
  projects,
  projectId,
  setProjectId,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  assignedTo,
  setAssignedTo,
  editingTaskId,
  editingTask,
  handleSubmit,
  handleEditTask,
  handleUpdateTask,
  handleDelete,
  error,
  logout,
  setView,
  setSelectedProjectId,
  setSelectedTaskId,
}) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý công việc</h2>
        <div>
          <span className="me-3">Welcome, {user.name}</span>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('projects')}
          >
            Manage Projects
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('viewAccount')}
          >
            View Account
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('updateAccount')}
          >
            Update Account
          </button>
          {user.role === 'admin' && (
            <button
              className="btn btn-primary me-2"
              onClick={() => setView('adminDashboard')}
            >
              Back to Dashboard
            </button>
          )}
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={editingTaskId ? handleUpdateTask : handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="form-label">Project</label>
          <select
            className="form-control"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tên công việc"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Mô tả công việc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Priority</label>
          <select
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label">Due Date</label>
          <input
            type="datetime-local"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Assigned To (User ID)</label>
          <input
            type="text"
            className="form-control"
            placeholder="ID người được giao"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
        {editingTaskId && (
          <button
            type="button"
            className="btn btn-secondary ms-2 mb-4"
            onClick={() => {
              setTitle('');
              setDescription('');
              setStatus('todo');
              setPriority('medium');
              setDueDate('');
              setAssignedTo('');
              handleEditTask(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{task.title}</strong>
              <br />
              <small>{task.description || 'No description'}</small>
              <br />
              <small>Hạn: {new Date(task.dueDate).toLocaleString()}</small>
              <br />
              <small>Trạng thái: {task.status}</small>
              <br />
              <small>Ưu tiên: {task.priority}</small>
              <br />
              <small>Người được giao: {task.assignedTo?.name || 'Chưa giao'}</small>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedTaskId(task._id);
                  setView('viewTask');
                }}
              >
                View
              </button>
              {(task.createdBy.toString() === user.userId || user.role === 'admin') && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;