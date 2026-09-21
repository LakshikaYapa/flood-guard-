import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <LanguageSwitcher />
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        {lang === 'en' ? 'Welcome' : 'ආයුබෝවන්'}, {user?.firstName} {user?.lastName} 👋
      </h2>
      <p className="text-slate-400 text-sm text-center">
        {lang === 'en' ? 'Logged in as:' : 'ඔබ පිවිස ඇත්තේ:'} <span className="text-white font-semibold">{user?.role}</span>
      </p>
      <p className="text-slate-400 text-sm text-center">
        {lang === 'en' ? 'Location:' : 'ස්ථානය:'} {user?.nearestTown}, {user?.district}
      </p>
      <p className="text-slate-400 text-sm text-center mb-4">
        {lang === 'en' ? 'Email:' : 'ඊමේල්:'} {user?.email}
      </p>
      <button
        onClick={handleLogout}
        className="w-full bg-rose-600 hover:bg-rose-500 text-white p-2.5 rounded font-semibold text-sm transition"
      >
        {lang === 'en' ? 'Log out' : 'ඉවත් වන්න'}
      </button>
    </div>
  );
};

export default Dashboard;