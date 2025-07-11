import React from 'react';

const ViewAccount = ({ user, error, logout, setView }) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Account</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView(user.role === 'admin' ? 'adminDashboard' : 'tasks')}
          >
            Back to {user.role === 'admin' ? 'Dashboard' : 'Tasks'}
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('updateAccount')}
          >
            Update Account
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4">
        <h3>Account Details</h3>
        <p><strong>ID:</strong> {user.userId}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Approved:</strong> {user.isApproved ? 'Yes' : 'No'}</p>
        <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewAccount;