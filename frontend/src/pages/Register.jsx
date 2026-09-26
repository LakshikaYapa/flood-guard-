import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import sriLankaLocations from '../data/sriLankaLocations';
import registerBg from '../assets/register-bg.jpg';

const provinces = Object.keys(sriLankaLocations);

const Icon = ({ path, className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    className={`w-4 h-4 text-slate-500 ${className}`}>
    <path d={path} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons = {
  user: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z',
  mail: 'M4 4h16v16H4zM22 6l-10 7L2 6',
  phone: 'M6 3h4l2 5-2.5 1.5a12 12 0 006 6L17 13l5 2v4a2 2 0 01-2 2C10.5 21 3 13.5 3 5a2 2 0 013-2z',
  lock: 'M6 10V7a6 6 0 1112 0v3M5 10h14v10H5z',
  town: 'M4 21V10l8-6 8 6v11M9 21v-6h6v6',
};

const Field = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2"><Icon path={icons[icon]} /></span>
    <input
      {...props}
      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/70 border border-slate-800 rounded-lg text-white text-sm
        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    province: '', district: '', nearestTown: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleProvinceChange = (e) => {
    setFormData({ ...formData, province: e.target.value, district: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || (lang === 'en' ? 'Registration failed' : 'ලියාපදිංචිය අසාර්ථකයි'));
    }
  };

  const districtsForProvince = formData.province ? sriLankaLocations[formData.province] : [];

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-slate-950">
      <div
        className="h-56 md:h-auto relative bg-slate-900 bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${registerBg})` }}
      ></div>

      <div className="relative flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-sm my-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-blue-950/40 p-7">
          <LanguageSwitcher />

          <div className="text-center mb-5">
            <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" className="w-5 h-5">
                <path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              {lang === 'en' ? 'Create Account' : 'ගිණුම සාදන්න'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              {lang === 'en' ? "Join your community's flood safety network" : 'ඔබේ ප්‍රජාවේ ආරක්ෂක ජාලයට එකතු වන්න'}
            </p>
          </div>

          {error && <p className="text-rose-400 text-sm mb-4 text-center bg-rose-950/40 border border-rose-900 rounded-lg py-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-3">
              <Field icon="user" type="text" placeholder={lang === 'en' ? 'First Name' : 'මුල් නම'} required
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
              <Field icon="user" type="text" placeholder={lang === 'en' ? 'Last Name' : 'වාසගම'} required
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
            </div>

            <Field icon="mail" type="email" placeholder={lang === 'en' ? 'Email Address' : 'විද්‍යුත් තැපෑල'} required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <Field icon="phone" type="text" placeholder={lang === 'en' ? 'Phone Number' : 'දුරකථන අංකය'}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

            <Field icon="lock" type="password" placeholder={lang === 'en' ? 'Password' : 'මුරපදය'} required minLength={6}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

            <div className="flex gap-3">
              <select
                className="w-1/2 px-3 py-2.5 bg-slate-900/70 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                value={formData.province} onChange={handleProvinceChange} required>
                <option value="">{lang === 'en' ? 'Province' : 'පළාත'}</option>
                {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>

              <select
                className="w-1/2 px-3 py-2.5 bg-slate-900/70 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-40"
                value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                disabled={!formData.province} required>
                <option value="">{lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'}</option>
                {districtsForProvince.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <Field icon="town" type="text" placeholder={lang === 'en' ? 'Nearest Town' : 'ආසන්නතම නගරය'} required
              onChange={(e) => setFormData({ ...formData, nearestTown: e.target.value })} />

            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400
                text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-lg shadow-blue-900/40">
              {lang === 'en' ? 'Create Account' : 'ගිණුම සාදන්න'}
            </button>
          </form>

          <p className="text-slate-400 text-xs text-center mt-4">
            {lang === 'en' ? 'Already have an account?' : 'දැනටමත් ගිණුමක් තිබේද?'}{' '}
            <Link to="/login" className="text-teal-400 font-medium">{lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;