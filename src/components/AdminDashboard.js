import React from 'react';

const AdminDashboard = ({ user, logout, setView }) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="me-3">Welcome, {user.name}</span>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => setView('pendingUsers')}
        >
          View Pending Users
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => setView('userAccounts')}
        >
          View All Users
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => setView('projects')}
        >
          Manage Projects
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => setView('tasks')}
        >
          View Tasks
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => setView('viewAccount')}
        >
          View Account
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setView('updateAccount')}
        >
          Update Account
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;