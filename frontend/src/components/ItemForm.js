import React, { useState } from 'react';
import { api } from '../services/api';

export default function ItemForm({ inventoryId, onItemAdded }) {
  const [values, setValues] = useState({
    name: '',
    quantity: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inventoryId) {
      alert('Please select an inventory first');
      return;
    }

    if (!values.name || !values.quantity) {
      alert('Name and Quantity are required');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/items', {
        inventoryId,
        values
      });
      alert(`✅ Item added with ID: ${res.data.customId}`);
      setValues({ name: '', quantity: '', location: '' });
      onItemAdded();
    } catch (err) {
      alert(err.response?.data?.error || '❌ Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">Add Item</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={values.name}
          onChange={e => handleChange('name', e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Quantity"
          value={values.quantity}
          onChange={e => handleChange('quantity', e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Location"
          value={values.location}
          onChange={e => handleChange('location', e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}
