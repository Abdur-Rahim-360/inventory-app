import React from 'react';

export default function ItemTable({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="card p-3">
        <h5 className="mb-3">Items</h5>
        <p>No items found for this inventory.</p>
      </div>
    );
  }

  return (
    <div className="card p-3">
      <h5 className="mb-3">Items</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Custom ID</th>
            <th>Details</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.custom_id}</td>
              <td>
                {Object.entries(JSON.parse(item.values_json)).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
