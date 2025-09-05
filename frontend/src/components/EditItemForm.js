import React, { useState } from 'react';
import axios from 'axios';

export default function EditItemForm({ item, onSave }) {
  const [values, setValues] = useState(() => {
    try {
      return typeof item.values_json === 'string'
        ? JSON.parse(item.values_json)
        : item.values_json;
    } catch {
      return {};
    }
  });

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/api/items/${item.id}`, {
      values
    }, { withCredentials: true });
    onSave();
  };

  return (
    <div className="mt-4">
      <h4>Edit Item #{item.id}</h4>
      {Object.entries(values).map(([key, value]) => (
        <div key={key} className="mb-2">
          <label className="form-label">{key}</label>
          <input
            className="form-control"
            value={value}
            onChange={e => setValues({ ...values, [key]: e.target.value })}
          />
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  );
}
