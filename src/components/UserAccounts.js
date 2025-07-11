import React from 'react';

const UserAccounts = ({ users, error, logout, setView, setTargetUserId }) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All User Accounts</h2>
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
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <strong>{user.name}</strong>
              <br />
              <small>ID: {user.userId}</small>
              <br />
              <small>Email: {user.email}</small>
              <br />
              <small>Role: {user.role}</small>
              <br />
              <small>Approved: {user.isApproved ? 'Yes' : 'No'}</small>
              <br />
              <small>Created: {new Date(user.createdAt).toLocaleString()}</small>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setTargetUserId(user._id);
                setView('updateAccount');
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccounts;