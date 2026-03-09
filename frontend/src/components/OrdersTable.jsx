import React, { useState } from 'react';
import { Eye, BellRing, Filter } from 'lucide-react';
import { getTimeAgo } from '../utils/dateUtils';

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
      <div className="orders-table-controls">
        <input
          type="text"
          placeholder="Search by tracking or customer..."
          className="search-input"
        />
        <div className="filter-group">
          <Filter size={18} color="var(--text-muted)" />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="filter-select"
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
                  <div className="order-actions">
                    <Eye size={18} className="action-icon" title="View Details" />
                    <div className="simulation-menu-container">
                      <button
                        onClick={() => handleSimulateClick(order.id, 'Delivered')}
                        disabled={isSimulating === order.id}
                        className="test-alert-btn"
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
