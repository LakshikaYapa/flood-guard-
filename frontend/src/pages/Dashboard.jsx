import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {user?.name} 👋</h1>
      <p>You are logged in as: <strong>{user?.role}</strong></p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} style={{ marginTop: '1rem', padding: '8px 16px', cursor: 'pointer' }}>
        Log out
      </button>
    </div>
  );
}

export default Dashboard;