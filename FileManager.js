import { useState } from 'react';
import { FiFolderPlus, FiFilePlus, FiChevronRight, FiChevronDown, FiTrash2 } from 'react-icons/fi';

export default function FileManager() {
  // Estado inicial con carpetas automáticas
  const [fileTree, setFileTree] = useState([
    { name: '.npm', type: 'folder', children: [], auto: true },
    { name: 'node_modules', type: 'folder', children: [], auto: true },
    { name: 'temp', type: 'folder', children: [], auto: true },
    { name: 'index.js', type: 'file', content: '// Código principal del bot' },
    { name: 'package.json', type: 'file', content: '{\n  "name": "mi-bot",\n  "version": "1.0.0"\n}' },
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(['.npm', 'node_modules', 'temp']);

  const addFolder = (parentName = null) => {
    const name = prompt('Nombre de la carpeta:');
    if (!name) return;
    const newFolder = { name, type: 'folder', children: [], auto: false };
    if (parentName) {
      const updatedTree = [...fileTree];
      const parent = findFolder(updatedTree, parentName);
      if (parent) parent.children.push(newFolder);
      setFileTree(updatedTree);
    } else {
      setFileTree([...fileTree, newFolder]);
    }
  };

  const addFile = (parentName = null) => {
    const name = prompt('Nombre del archivo (ej: config.json):');
    if (!name) return;
    const newFile = { name, type: 'file', content: '' };
    if (parentName) {
      const updatedTree = [...fileTree];
      const parent = findFolder(updatedTree, parentName);
      if (parent) parent.children.push(newFile);
      setFileTree(updatedTree);
    } else {
      setFileTree([...fileTree, newFile]);
    }
  };

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName) ? prev.filter((f) => f !== folderName) : [...prev, folderName]
    );
  };

  const deleteItem = (itemName, parentName = null) => {
    if (confirm(`¿Eliminar ${itemName}?`)) {
      if (parentName) {
        const updatedTree = [...fileTree];
        const parent = findFolder(updatedTree, parentName);
        if (parent) parent.children = parent.children.filter((c) => c.name !== itemName);
        setFileTree(updatedTree);
      } else {
        setFileTree(fileTree.filter((item) => item.name !== itemName));
      }
    }
  };

  const findFolder = (tree, name) => {
    for (const item of tree) {
      if (item.type === 'folder' && item.name === name) return item;
      if (item.children) {
        const found = findFolder(item.children, name);
        if (found) return found;
      }
    }
    return null;
  };

  const renderTree = (items, depth = 0, parentName = null) => {
    return items.map((item) => (
      <div key={item.name} style={{ paddingLeft: depth * 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0' }}>
          {item.type === 'folder' ? (
            <>
              <span onClick={() => toggleFolder(item.name)} style={{ cursor: 'pointer' }}>
                {expandedFolders.includes(item.name) ? <FiChevronDown /> : <FiChevronRight />}
              </span>
              <span style={{ fontWeight: 600 }}>📁 {item.name}</span>
            </>
          ) : (
            <>
              <span style={{ marginLeft: '24px' }}>📄 {item.name}</span>
            </>
          )}
          <button onClick={() => deleteItem(item.name, parentName)} style={iconButtonStyle} title="Eliminar">
            <FiTrash2 size={14} />
          </button>
          {item.type === 'folder' && (
            <>
              <button onClick={() => addFile(item.name)} style={iconButtonStyle} title="Añadir archivo dentro">
                <FiFilePlus size={14} />
              </button>
              <button onClick={() => addFolder(item.name)} style={iconButtonStyle} title="Añadir subcarpeta">
                <FiFolderPlus size={14} />
              </button>
            </>
          )}
        </div>
        {item.type === 'folder' && expandedFolders.includes(item.name) && item.children && (
          renderTree(item.children, depth + 1, item.name)
        )}
      </div>
    ));
  };

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => addFolder()} style={actionButtonStyle}>
          <FiFolderPlus /> Nueva carpeta
        </button>
        <button onClick={() => addFile()} style={actionButtonStyle}>
          <FiFilePlus /> Nuevo archivo
        </button>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>
        {renderTree(fileTree)}
      </div>
    </div>
  );
}

const actionButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'var(--primary)',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
};

const iconButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '0.2rem',
  display: 'flex',
  alignItems: 'center',
};
