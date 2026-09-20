import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'citizen' });
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(form);
    if (success) navigate('/dashboard');
  };

  return (
    <div style={styles.wrap}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <label style={styles.label}>Full name</label>
        <input style={styles.input} name="name" value={form.name} onChange={handleChange} required />
        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" name="email" value={form.email} onChange={handleChange} required />
        <label style={styles.label}>Phone (optional)</label>
        <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} />
        <label style={styles.label}>Password</label>
        <input style={styles.input} type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        <label style={styles.label}>I am a</label>
        <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '1rem' },
  card: { width: '340px', padding: '2rem', border: '1px solid #ddd', borderRadius: '10px', fontFamily: 'sans-serif' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, margin: '10px 0 4px' },
  input: { width: '100%', padding: '8px 10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' },
  button: { width: '100%', marginTop: '18px', padding: '10px', background: '#0E7C86', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' },
  error: { background: '#FCE6DC', color: '#C2440F', padding: '8px 10px', borderRadius: '6px', fontSize: '13px' },
};

export default Register;