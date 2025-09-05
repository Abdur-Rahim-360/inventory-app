// src/components/InventoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function InventoryForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([{ name: '', type: 'text' }]);

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/inventories', {
      title,
      description,
      fields,
    });
    alert('Inventory created!');
    setTitle('');
    setDescription('');
    setFields([{ name: '', type: 'text' }]);
  };

  return (
    <div className="container mt-4">
      <h3>Create Inventory</h3>
      <input
        className="form-control"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mt-2"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {fields.map((field, idx) => (
        <div key={idx} className="d-flex mt-2">
          <input
            className="form-control me-2"
            placeholder="Field Name"
            value={field.name}
            onChange={e => {
              const newFields = [...fields];
              newFields[idx].name = e.target.value;
              setFields(newFields);
            }}
          />
          <select
            className="form-select"
            value={field.type}
            onChange={e => {
              const newFields = [...fields];
              newFields[idx].type = e.target.value;
              setFields(newFields);
            }}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
        </div>
      ))}
      <button
        className="btn btn-secondary m-2"
        onClick={() => setFields([...fields, { name: '', type: 'text' }])}
      >
        Add Field
      </button>
      <button className="btn btn-primary m-2" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
