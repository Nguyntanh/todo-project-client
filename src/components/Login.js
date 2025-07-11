import React from 'react';

const Login = ({ email, setEmail, password, setPassword, error, handleLogin, setView }) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary mb-3" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-link" onClick={() => setView('register')}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;