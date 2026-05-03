import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function CreateAccountForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Opcional: guardar el username en la base de datos
      setSuccess(`Cuenta creada: ${userCredential.user.email}. Ya puedes iniciar sesión.`);
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <form onSubmit={handleCreate} style={{
        background: 'var(--surface)',
        padding: '2rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        width: '90%',
        maxWidth: '400px',
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Crear nueva cuenta</h3>
        <input
          type="text"
          placeholder="Nombre de usuario (opcional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>{error}</p>}
        {success && <p style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>{success}</p>}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={primaryButtonStyle}>Crear cuenta</button>
          <button type="button" onClick={onClose} style={secondaryButtonStyle}>Cerrar</button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  marginBottom: '1rem',
};

const primaryButtonStyle = {
  flex: 1,
  background: 'var(--primary)',
  border: 'none',
  padding: '0.7rem',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
};

const secondaryButtonStyle = {
  flex: 1,
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  padding: '0.7rem',
  borderRadius: '8px',
  color: 'var(--text)',
  cursor: 'pointer',
};
