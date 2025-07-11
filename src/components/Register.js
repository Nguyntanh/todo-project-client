import React from 'react';

const Register = ({ name, setName, email, setEmail, password, setPassword, error, handleRegister, setView }) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button className="btn btn-primary mb-3" onClick={handleRegister}>
          Register
        </button>
        <button className="btn btn-link" onClick={() => setView('login')}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;