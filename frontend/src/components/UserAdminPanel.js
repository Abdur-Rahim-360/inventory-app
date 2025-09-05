import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function UserAdminPanel() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  const searchUsers = async () => {
    const res = await api.get(`/users/search?q=${query}`);
    setUsers(res.data);
  };

  const blockUser = async (id) => {
    await api.put(`/users/${id}/block`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-4">
      <h4>User Management</h4>
      <input
        className="form-control mb-2"
        placeholder="Search by name or email"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && searchUsers()}
      />
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.username}</strong> — {user.email}
              {user.blocked ? <span className="badge bg-danger ms-2">Blocked</span> : null}
            </div>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => blockUser(user.id)}>Block</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
