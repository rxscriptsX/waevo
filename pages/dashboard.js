import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <Layout><p>Cargando...</p></Layout>;
  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Panel de Control</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard/console" style={cardStyle}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Console</span>
            <p style={{ color: 'var(--text-secondary)' }}>Métricas y logs del bot</p>
          </Link>
          <Link href="/dashboard/files" style={cardStyle}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Files</span>
            <p style={{ color: 'var(--text-secondary)' }}>Gestionar archivos del bot</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

const cardStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '2rem 3rem',
  textAlign: 'center',
  cursor: 'pointer',
  transition: '0.2s',
  minWidth: '200px',
  color: 'inherit',
  display: 'block',
};
