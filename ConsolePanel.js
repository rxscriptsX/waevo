import { FiPlay, FiSquare, FiRefreshCw } from 'react-icons/fi';

export default function ConsolePanel({ metrics, logs, botStatus, onStart, onStop, onRestart }) {
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Métricas */}
      <div style={{ flex: 1, minWidth: '250px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Rendimiento</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <MetricBox label="CPU" value={`${metrics.cpu}%`} />
          <MetricBox label="Memoria" value={`${metrics.memory} MB`} />
          <MetricBox label="Disco" value={`${metrics.disk} GB`} />
          <MetricBox label="Red" value={`↓ ${metrics.network.rx} kB/s ↑ ${metrics.network.tx} kB/s`} />
        </div>
      </div>

      {/* Logs y controles */}
      <div style={{ flex: 2, minWidth: '350px', background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={onStart}
            disabled={botStatus === 'running' || botStatus === 'starting'}
            style={{ ...controlButtonStyle, background: botStatus === 'running' ? 'var(--surface2)' : 'var(--success)' }}
            title="Iniciar bot"
          >
            <FiPlay /> Start
          </button>
          <button
            onClick={onStop}
            disabled={botStatus === 'stopped'}
            style={{ ...controlButtonStyle, background: botStatus === 'stopped' ? 'var(--surface2)' : 'var(--danger)' }}
            title="Detener bot"
          >
            <FiSquare /> Stop
          </button>
          <button
            onClick={onRestart}
            disabled={botStatus === 'starting' || botStatus === 'stopped'}
            style={{ ...controlButtonStyle, background: 'var(--primary)' }}
            title="Reiniciar bot"
          >
            <FiRefreshCw /> Restart
          </button>
        </div>
        <div style={{
          background: '#000',
          borderRadius: '8px',
          padding: '1rem',
          height: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#b9bbbe',
          border: '1px solid var(--border)',
        }}>
          {logs.map((line, i) => (
            <div key={i} style={{ marginBottom: '4px' }}>{line}</div>
          ))}
        </div>
        <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Estado: {botStatus === 'running' ? '🟢 Online' : botStatus === 'starting' ? '🟡 Iniciando' : botStatus === 'error' ? '🔴 Error' : '⚪ Detenido'}
        </div>
      </div>
    </div>
  );
}

function MetricBox({ label, value }) {
  return (
    <div style={{ background: 'var(--surface2)', padding: '0.8rem', borderRadius: '8px' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{value}</div>
    </div>
  );
}

const controlButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.2s',
};
