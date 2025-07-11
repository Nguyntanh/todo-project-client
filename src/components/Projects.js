import React from 'react';

const Projects = ({
  user,
  projects,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectMembers,
  setProjectMembers,
  editingProjectId,
  handleCreateProject,
  handleUpdateProject,
  handleEditProject,
  handleDeleteProject,
  error,
  logout,
  setView,
  setSelectedProjectId,
}) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Projects</h2>
        <div>
          <span className="me-3">Welcome, {user.name}</span>
          {user.role === 'admin' && (
            <button
              className="btn btn-primary me-2"
              onClick={() => setView('adminDashboard')}
            >
              Back to Dashboard
            </button>
          )}
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('tasks')}
          >
            View Tasks
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={editingProjectId ? handleUpdateProject : handleCreateProject} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tên dự án"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Mô tả dự án"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Members (User IDs, comma-separated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="ID thành viên (e.g., id1, id2)"
            value={projectMembers}
            onChange={(e) => setProjectMembers(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingProjectId ? 'Update Project' : 'Create Project'}
        </button>
        {editingProjectId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setProjectName('');
              setProjectDescription('');
              setProjectMembers('');
              handleEditProject(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul className="list-group">
        {projects.map((project) => (
          <li
            key={project._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <strong>{project.name}</strong>
              <br />
              <small>{project.description || 'No description'}</small>
              <br />
              <small>Created By: {project.createdBy.name}</small>
              <br />
              <small>Members: {project.members.map(m => m.name).join(', ') || 'None'}</small>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedProjectId(project._id);
                  setView('viewProject');
                }}
              >
                View
              </button>
              {(project.createdBy._id === user.userId || user.role === 'admin') && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProject(project._id)}
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

export default Projects;