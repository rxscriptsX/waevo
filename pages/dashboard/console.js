import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ConsolePanel from '../../components/ConsolePanel';

export default function ConsolePage() {
  // Simula métricas del sistema y logs.
  const [metrics, setMetrics] = useState({
    cpu: Math.floor(Math.random() * 60 + 20),
    memory: Math.floor(Math.random() * 512 + 200),
    disk: Math.floor(Math.random() * 40 + 10),
    network: { rx: Math.floor(Math.random() * 100), tx: Math.floor(Math.random() * 50) },
  });

  const [logs, setLogs] = useState(['[Sistema] Esperando inicio del bot...']);
  const [botStatus, setBotStatus] = useState('stopped'); // stopped, starting, running, error

  // Actualiza métricas periódicamente (simulación)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 60 + 20),
        memory: Math.floor(Math.random() * 512 + 200),
        disk: Math.floor(Math.random() * 40 + 10),
        network: { rx: Math.floor(Math.random() * 100), tx: Math.floor(Math.random() * 50) },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simula la acción de inicio/parada/reinicio mediante API routes (ficticias)
  const handleStart = async () => {
    setBotStatus('starting');
    setLogs((prev) => [...prev, '[Inicio] Preparando entorno...']);
    try {
      const res = await fetch('/api/bot/start');
      const data = await res.json();
      setTimeout(() => {
        setBotStatus('running');
        setLogs((prev) => [...prev, '[Inicio] Bot iniciado correctamente.', '[Bot] Conectado a Discord.']);
      }, 2000);
    } catch (err) {
      setBotStatus('error');
      setLogs((prev) => [...prev, '[Error] Fallo al iniciar el bot.']);
    }
  };

  const handleStop = async () => {
    setBotStatus('stopped');
    setLogs((prev) => [...prev, '[Parada] Bot detenido.']);
    await fetch('/api/bot/stop');
  };

  const handleRestart = async () => {
    setBotStatus('starting');
    setLogs((prev) => [...prev, '[Reinicio] Reiniciando bot...']);
    await fetch('/api/bot/restart');
    setTimeout(() => {
      setBotStatus('running');
      setLogs((prev) => [...prev, '[Reinicio] Bot reiniciado con éxito.']);
    }, 2000);
  };

  return (
    <Layout>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Consola</h2>
      <ConsolePanel
        metrics={metrics}
        logs={logs}
        botStatus={botStatus}
        onStart={handleStart}
        onStop={handleStop}
        onRestart={handleRestart}
      />
    </Layout>
  );
}
