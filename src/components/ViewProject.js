import React from 'react';

const ViewProject = ({ projects, selectedProjectId, user, error, logout, setView, handleEditProject }) => {
  const project = projects.find((p) => p._id === selectedProjectId);

  if (!project) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>View Project</h2>
          <div>
            <button
              className="btn btn-primary me-2"
              onClick={() => setView('projects')}
            >
              Back to Projects
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="alert alert-danger">Project not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Project Details</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('projects')}
          >
            Back to Projects
          </button>
          {(project.createdBy._id === user.userId || user.role === 'admin') && (
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEditProject(project)}
            >
              Edit Project
            </button>
          )}
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4">
        <h3>{project.name}</h3>
        <p><strong>Description:</strong> {project.description || 'No description'}</p>
        <p><strong>Created By:</strong> {project.createdBy.name}</p>
        <p><strong>Members:</strong> {project.members.map(m => m.name).join(', ') || 'None'}</p>
        <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewProject;