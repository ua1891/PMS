import React, { useState } from 'react';
import { Eye, BellRing, Filter } from 'lucide-react';

export default function OrdersTable({ orders, onSimulate }) {
  const [filter, setFilter] = useState('All Status');
  const [isSimulating, setIsSimulating] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pickup Ready': return 'ready';
      case 'Returned': return 'returned';
      case 'Delivered': return 'delivered';
      case 'In Transit': return 'transit';
      default: return 'pending';
    }
  };

  const getTimeAgo = (dateString) => {
    const minDiff = Math.floor((new Date() - new Date(dateString)) / 60000);
    if (minDiff < 60) return `${minDiff} mins ago`;
    const hourDiff = Math.floor(minDiff / 60);
    if (hourDiff < 24) return `${hourDiff} hours ago`;
    const dayDiff = Math.floor(hourDiff / 24);
    return `${dayDiff} day${dayDiff > 1 ? 's' : ''} ago`;
  };

  const handleSimulateClick = async (id, type) => {
    setIsSimulating(id);
    await onSimulate(id, type);
    setIsSimulating(null);
  };

  const filteredOrders = filter === 'All Status' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <input 
          type="text" 
          placeholder="Search by tracking or customer..." 
          style={{ 
            flex: 1, 
            padding: '10px 16px', 
            borderRadius: 8, 
            border: '1px solid var(--border-color)',
            outline: 'none',
            fontSize: 14
          }} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={18} color="var(--text-muted)" />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: 8, 
              border: '1px solid var(--border-color)',
              outline: 'none',
              backgroundColor: 'white',
              fontSize: 14
            }}
          >
            <option>All Status</option>
            <option>In Transit</option>
            <option>Pickup Ready</option>
            <option>Delivered</option>
            <option>Returned</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td style={{ color: 'var(--primary)', fontWeight: 500 }}>{order.trackingNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.destination || 'N/A'}</td>
                <td>
                  <span className={`badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  {getTimeAgo(order.updatedAt)}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Eye size={18} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} title="View Details" />
                    <div className="simulation-menu" style={{ position: 'relative' }}>
                      <button 
                        onClick={() => handleSimulateClick(order.id, 'Delivered')}
                        disabled={isSimulating === order.id}
                        style={{ 
                          background: '#f0fdf4', 
                          border: '1px solid #bbf7d0', 
                          color: '#16a34a',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Simulate Delivery Alert"
                      >
                        <BellRing size={12} />
                        Test Alert
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
