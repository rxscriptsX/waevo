import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import PasswordPrompt from './PasswordPrompt';
import CreateAccountForm from './CreateAccountForm';

export default function SecretButton() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const handleCorrectPassword = () => {
    setShowPrompt(false);
    setAuthorized(true);
  };

  return (
    <>
      <button
        onClick={() => setShowPrompt(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: 0.4,
          transition: 'opacity 0.2s',
          fontSize: '1.5rem',
          zIndex: 999,
        }}
        title="Acceso restringido"
      >
        <FiPlus />
      </button>
      {showPrompt && <PasswordPrompt onCorrect={handleCorrectPassword} onClose={() => setShowPrompt(false)} />}
      {authorized && <CreateAccountForm onClose={() => setAuthorized(false)} />}
    </>
  );
}
