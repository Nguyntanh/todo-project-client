import React from 'react';

const PendingUsers = ({ pendingUsers, handleApproveUser, error, logout, setView }) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pending User Accounts</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView('adminDashboard')}
          >
            Back to Dashboard
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {pendingUsers.map((pendingUser) => (
          <li
            key={pendingUser._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <strong>{pendingUser.name}</strong>
              <br />
              <small>Email: {pendingUser.email}</small>
            </div>
            <button
              className="btn btn-success"
              onClick={() => handleApproveUser(pendingUser.userId)}
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingUsers;