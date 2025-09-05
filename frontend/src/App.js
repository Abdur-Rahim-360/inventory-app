// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import { api }             from './services/api';
import AuthForm            from './components/AuthForm';
import SearchBar           from './components/SearchBar';
import InventoryForm       from './components/InventoryForm';
import InventoryList       from './components/InventoryList';
import ItemForm            from './components/ItemForm';
import ItemTable           from './components/ItemTable';
import UserAdminPanel      from './components/UserAdminPanel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [role, setRole] = useState(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [items, setItems] = useState([]);

  // Restore session
  useEffect(() => {
    api.get('/auth/session')
      .then(res => {
        if (res.data.loggedIn) {
          setRole(res.data.role);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch items when inventory changes
  useEffect(() => {
    if (!selectedInventoryId) return;
    api.get(`/items/${selectedInventoryId}`)
      .then(res => setItems(res.data))
      .catch(console.error);
  }, [selectedInventoryId]);

  // Refresh after adding
  const handleItemAdded = () => {
    if (!selectedInventoryId) return;
    api.get(`/items/${selectedInventoryId}`)
      .then(res => setItems(res.data))
      .catch(console.error);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setRole(null);
      setSelectedInventoryId(null);
      setItems([]);
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Try again.');
    }
  };

  // Show login/signup until authenticated
  if (!role) {
    return <AuthForm onLogin={setRole} />;
  }

  // Once logged in, render the dashboard
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory Manager</h2>
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <SearchBar onResults={setItems} />

      <div className="row">
        <div className="col-md-6">
          <InventoryForm />
        </div>
        <div className="col-md-6">
          <InventoryList onSelect={setSelectedInventoryId} />
        </div>
      </div>

      {selectedInventoryId && (
        <>
          <div className="mt-4">
            <ItemForm inventoryId={selectedInventoryId} onItemAdded={handleItemAdded} />
          </div>
          <div className="mt-4">
            <ItemTable items={items} />
          </div>
        </>
      )}

      <div className="mt-5">
        <UserAdminPanel />
      </div>
    </div>
  );
}

export default App;
