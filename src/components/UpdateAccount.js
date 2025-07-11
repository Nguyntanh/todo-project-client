import React from 'react';

const UpdateAccount = ({
  user,
  updateName,
  setUpdateName,
  updateEmail,
  setUpdateEmail,
  updateRole,
  setUpdateRole,
  targetUserId,
  setTargetUserId,
  error,
  handleUpdateAccount,
  logout,
  setView,
}) => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Update Account</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setView(user.role === 'admin' ? 'adminDashboard' : 'tasks')}
          >
            Back to {user.role === 'admin' ? 'Dashboard' : 'Tasks'}
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdateAccount} className="card p-4" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            required
          />
        </div>
        {user.role === 'admin' && (
          <>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={updateRole}
                onChange={(e) => setUpdateRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Target User ID (optional, for admins)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter user ID to update another user"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;