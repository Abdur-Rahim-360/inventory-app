import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function InventoryList({ onSelect }) {
  const [inventories, setInventories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });

  const fetchInventories = async () => {
    const res = await api.get('/inventories');
    setInventories(res.data);
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const handleEdit = (inv) => {
    setEditingId(inv.id);
    setEditData({ title: inv.title, description: inv.description });
  };

  const handleSave = async () => {
    await api.put(`/inventories/${editingId}`, editData);
    setEditingId(null);
    fetchInventories();
  };

  const handleDelete = async (id) => {
    await api.delete(`/inventories/${id}`);
    fetchInventories();
  };

  return (
    <div>
      <h4>Inventories</h4>
      <ul>
        {inventories.map(inv => (
          <li key={inv.id}>
            {editingId === inv.id ? (
              <>
                <input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                <input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <strong>{inv.title}</strong> — {inv.description}
                <button onClick={() => onSelect(inv.id)}>View</button>
                <button onClick={() => handleEdit(inv)}>Edit</button>
                <button onClick={() => handleDelete(inv.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
