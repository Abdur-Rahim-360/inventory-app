import React, { useState } from 'react';
import { api } from '../services/api';

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const res = await api.get(`/search?q=${query}`);
    onResults(res.data);
  };

  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder="Search items..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}
