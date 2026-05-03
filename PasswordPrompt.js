import { useState } from 'react';

export default function PasswordPrompt({ onCorrect, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'only-alex') {
      onCorrect();
    } else {
      setError(true);
      setPassword('');
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
      <form onSubmit={handleSubmit} style={{
        background: 'var(--surface)',
        padding: '2rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        width: '90%',
        maxWidth: '400px',
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Acceso secreto</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Contraseña"
          autoFocus
          style={{
            width: '100%',
            padding: '0.7rem',
            background: 'var(--surface2)',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            borderRadius: '8px',
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        />
        {error && <p style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Contraseña incorrecta</p>}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{
            flex: 1,
            background: 'var(--primary)',
            border: 'none',
            padding: '0.7rem',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
          }}>Confirmar</button>
          <button type="button" onClick={onClose} style={{
            flex: 1,
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            padding: '0.7rem',
            borderRadius: '8px',
            color: 'var(--text)',
            cursor: 'pointer',
          }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
