import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import sriLankaLocations from '../data/sriLankaLocations';

const provinces = Object.keys(sriLankaLocations);

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
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 rounded-xl border border-slate-800">
      <LanguageSwitcher />
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        {lang === 'en' ? 'Create Account' : 'ගිණුම සාදන්න'}
      </h2>
      {error && <p className="text-rose-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <input type="text" placeholder={lang === 'en' ? 'First Name' : 'මුල් නම'} required
            className="w-1/2 p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
          <input type="text" placeholder={lang === 'en' ? 'Last Name' : 'වාසගම'} required
            className="w-1/2 p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
        </div>

        <input type="email" placeholder={lang === 'en' ? 'Email Address' : 'විද්‍යුත් තැපෑල'} required
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

        <input type="text" placeholder={lang === 'en' ? 'Phone Number' : 'දුරකථන අංකය'}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

        <input type="password" placeholder={lang === 'en' ? 'Password' : 'මුරපදය'} required minLength={6}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        <div className="flex gap-3">
          <select className="w-1/2 p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
            value={formData.province} onChange={handleProvinceChange} required>
            <option value="">{lang === 'en' ? 'Province' : 'පළාත'}</option>
            {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <select className="w-1/2 p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm disabled:opacity-40"
            value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            disabled={!formData.province} required>
            <option value="">{lang === 'en' ? 'District' : 'දිස්ත්‍රික්කය'}</option>
            {districtsForProvince.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <input type="text" placeholder={lang === 'en' ? 'Nearest Town' : 'ආසන්නතම නගරය'} required
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white text-sm"
          onChange={(e) => setFormData({ ...formData, nearestTown: e.target.value })} />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded font-semibold text-sm transition">
          {lang === 'en' ? 'Create Account' : 'ගිණුම සාදන්න'}
        </button>
      </form>

      <p className="text-slate-400 text-xs text-center mt-3">
        {lang === 'en' ? 'Already have an account?' : 'දැනටමත් ගිණුමක් තිබේද?'}{' '}
        <Link to="/login" className="text-blue-400">{lang === 'en' ? 'Login' : 'ඇතුළු වන්න'}</Link>
      </p>
    </div>
  );
};

export default Register;