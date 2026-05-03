import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import SecretButton from './SecretButton';

export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <div style={{ padding: '2rem' }}>Cargando...</div>;
  if (!user && router.pathname !== '/') {
    router.push('/');
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {user && (
        <nav style={{
          background: 'var(--surface)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>LynxNodes</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: '0.2s',
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
      <SecretButton />
    </div>
  );
}
