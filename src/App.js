import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import PendingUsers from './components/PendingUsers';
import UserAccounts from './components/UserAccounts';
import ViewAccount from './components/ViewAccount';
import UpdateAccount from './components/UpdateAccount';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import ViewProject from './components/ViewProject';
import ViewTask from './components/ViewTask';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState('login');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectMembers, setProjectMembers] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateRole, setUpdateRole] = useState('user');
  const [targetUserId, setTargetUserId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (token && user) {
      if (user.role === 'admin' && view === 'pendingUsers') {
        fetchPendingUsers();
      } else if (user.role === 'admin' && view === 'userAccounts') {
        fetchUsers();
      } else if (view === 'projects' || view === 'tasks' || view === 'viewProject' || view === 'viewTask') {
        fetchProjects();
        if (view === 'tasks' || view === 'viewTask') {
          fetchTasks();
        }
      } else if (view === 'viewAccount' || view === 'updateAccount') {
        fetchUser(targetUserId);
      }
    }
  }, [projectId, token, user, view, targetUserId]);

  const fetchUser = async (userId = '') => {
    try {
      const url = userId ? `http://localhost:3000/api/auth/me?userId=${userId}` : 'http://localhost:3000/api/auth/me';
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (view === 'viewAccount' || view === 'updateAccount') {
        setUpdateName(response.data.name);
        setUpdateEmail(response.data.email);
        setUpdateRole(response.data.role);
      } else {
        setUser(response.data);
        setView(response.data.role === 'admin' ? 'adminDashboard' : 'tasks');
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      localStorage.removeItem('token');
      setToken('');
      setView('login');
      setError(error.response?.data?.message || 'Failed to fetch user');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
      if (response.data.length > 0 && !projectId) {
        setProjectId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Fetch projects error:', error);
      setError(error.response?.data?.message || 'Failed to fetch projects');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      setError(error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/pending-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Fetch pending users error:', error);
      setError(error.response?.data?.message || 'Failed to fetch pending users');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Fetch users error:', error);
      setError(error.response?.data?.message || 'Failed to fetch users');
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/auth/approve/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error approving user:', error);
      setError(error.response?.data?.message || 'Failed to approve user');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', { email, password, name });
      setError('');
      setEmail('');
      setPassword('');
      setName('');
      setView('login');
      alert(response.data.message || 'Registration request sent, awaiting admin approval');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const members = projectMembers.split(',').map(id => id.trim()).filter(id => id);
      await axios.post(
        'http://localhost:3000/api/projects',
        { name: projectName, description: projectDescription, members },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjectName('');
      setProjectDescription('');
      setProjectMembers('');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      setError(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const members = projectMembers.split(',').map(id => id.trim()).filter(id => id);
      await axios.put(
        `http://localhost:3000/api/projects/${editingProjectId}`,
        { name: projectName, description: projectDescription, members },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjectName('');
      setProjectDescription('');
      setProjectMembers('');
      setEditingProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      setError(error.response?.data?.message || 'Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((project) => project._id !== id));
      if (projectId === id) setProjectId('');
    } catch (error) {
      console.error('Error deleting project:', error);
      setError(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project?._id || null);
    setProjectName(project?.name || '');
    setProjectDescription(project?.description || '');
    setProjectMembers(project?.members.map(member => member._id).join(', ') || '');
    setView('projects');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/tasks',
        {
          projectId,
          title,
          description,
          status,
          priority,
          dueDate,
          assignedTo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
      setAssignedTo('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      setError(error.response?.data?.message || 'Failed to add task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task?._id || null);
    setEditingTask(task || null);
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setStatus(task?.status || 'todo');
    setPriority(task?.priority || 'medium');
    setDueDate(task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
    setAssignedTo(task?.assignedTo?._id || '');
    setProjectId(task?.projectId || '');
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${editingTaskId}`,
        {
          projectId,
          title,
          description,
          status,
          priority,
          dueDate,
          assignedTo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
      setAssignedTo('');
      setEditingTaskId(null);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setError(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const data = { name: updateName, email: updateEmail };
      if (user.role === 'admin' && updateRole) {
        data.role = updateRole;
      }
      const url = targetUserId && user.role === 'admin' ? `http://localhost:3000/api/auth/me?userId=${targetUserId}` : 'http://localhost:3000/api/auth/me';
      await axios.put(url, data, { headers: { Authorization: `Bearer ${token}` } });
      setUpdateName('');
      setUpdateEmail('');
      setUpdateRole('user');
      setTargetUserId('');
      setError('');
      setView(user.role === 'admin' ? 'adminDashboard' : 'tasks');
      if (!targetUserId) fetchUser();
    } catch (error) {
      console.error('Error updating account:', error);
      setError(error.response?.data?.message || 'Failed to update account');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setTasks([]);
    setProjects([]);
    setPendingUsers([]);
    setUsers([]);
    setEditingTaskId(null);
    setEditingProjectId(null);
    setUpdateName('');
    setUpdateEmail('');
    setUpdateRole('user');
    setTargetUserId('');
    setSelectedProjectId('');
    setSelectedTaskId('');
    setView('login');
  };

  return (
    <div>
      {view === 'login' && (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleLogin={handleLogin}
          setView={setView}
        />
      )}
      {view === 'register' && (
        <Register
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleRegister={handleRegister}
          setView={setView}
        />
      )}
      {view === 'adminDashboard' && user?.role === 'admin' && (
        <AdminDashboard
          user={user}
          logout={logout}
          setView={setView}
        />
      )}
      {view === 'pendingUsers' && user?.role === 'admin' && (
        <PendingUsers
          pendingUsers={pendingUsers}
          handleApproveUser={handleApproveUser}
          error={error}
          logout={logout}
          setView={setView}
        />
      )}
      {view === 'userAccounts' && user?.role === 'admin' && (
        <UserAccounts
          users={users}
          error={error}
          logout={logout}
          setView={setView}
          setTargetUserId={setTargetUserId}
        />
      )}
      {view === 'viewAccount' && (
        <ViewAccount
          user={user}
          error={error}
          logout={logout}
          setView={setView}
        />
      )}
      {view === 'updateAccount' && (
        <UpdateAccount
          user={user}
          updateName={updateName}
          setUpdateName={setUpdateName}
          updateEmail={updateEmail}
          setUpdateEmail={setUpdateEmail}
          updateRole={updateRole}
          setUpdateRole={setUpdateRole}
          targetUserId={targetUserId}
          setTargetUserId={setTargetUserId}
          error={error}
          handleUpdateAccount={handleUpdateAccount}
          logout={logout}
          setView={setView}
        />
      )}
      {view === 'projects' && (
        <Projects
          user={user}
          projects={projects}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          projectMembers={projectMembers}
          setProjectMembers={setProjectMembers}
          editingProjectId={editingProjectId}
          handleCreateProject={handleCreateProject}
          handleUpdateProject={handleUpdateProject}
          handleEditProject={handleEditProject}
          handleDeleteProject={handleDeleteProject}
          error={error}
          logout={logout}
          setView={setView}
          setSelectedProjectId={setSelectedProjectId}
        />
      )}
      {view === 'tasks' && (
        <Tasks
          user={user}
          tasks={tasks}
          projects={projects}
          projectId={projectId}
          setProjectId={setProjectId}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          assignedTo={assignedTo}
          setAssignedTo={setAssignedTo}
          editingTaskId={editingTaskId}
          editingTask={editingTask}
          handleSubmit={handleSubmit}
          handleEditTask={handleEditTask}
          handleUpdateTask={handleUpdateTask}
          handleDelete={handleDelete}
          error={error}
          logout={logout}
          setView={setView}
          setSelectedProjectId={setSelectedProjectId}
          setSelectedTaskId={setSelectedTaskId}
        />
      )}
      {view === 'viewProject' && (
        <ViewProject
          projects={projects}
          selectedProjectId={selectedProjectId}
          user={user}
          error={error}
          logout={logout}
          setView={setView}
          handleEditProject={handleEditProject}
        />
      )}
      {view === 'viewTask' && (
        <ViewTask
          tasks={tasks}
          projects={projects}
          selectedTaskId={selectedTaskId}
          user={user}
          error={error}
          logout={logout}
          setView={setView}
          handleEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default App;