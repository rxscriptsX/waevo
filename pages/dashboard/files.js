import { useState } from 'react';
import Layout from '../../components/Layout';
import FileManager from '../../components/FileManager';

export default function FilesPage() {
  return (
    <Layout>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Archivos del Bot</h2>
      <FileManager />
    </Layout>
  );
}
