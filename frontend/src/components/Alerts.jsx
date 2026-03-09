import React from 'react';
import { Bell, PackageSearch, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { getTimeAgo } from '../utils/dateUtils';

export default function Alerts({ alerts }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Pickup Ready': return <PackageSearch size={20} className="alert-icon" />;
      case 'Return Initiated': return <AlertCircle size={20} className="alert-icon" />;
      case 'Delivery Confirmed': return <CheckCircle size={20} className="alert-icon" />;
      case 'Delayed Shipment': return <Clock size={20} className="alert-icon" />;
      default: return <Bell size={20} className="alert-icon" />;
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'Pickup Ready': return 'ready';
      case 'Return Initiated': return 'returned';
      case 'Delivery Confirmed': return 'delivered';
      case 'Delayed Shipment': return 'delayed';
      default: return '';
    }
  };



  return (
    <div className="alerts-feed">
      <div className="alerts-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Bell size={20} color="var(--primary)" />
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>Recent Alerts</h3>
        </div>
        <div className="alerts-badge">
          {alerts.length}
        </div>
      </div>

      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${getAlertClass(alert.type)}`}>
            {getIcon(alert.type)}
            <div className="alert-content" style={{ flex: 1 }}>
              <div className="alert-meta">
                <h4>{alert.type}</h4>
                <span className="alert-time">{getTimeAgo(alert.createdAt)}</span>
              </div>
              <p>{alert.message}</p>
              <div className="alert-tracking">{alert.order.trackingNumber}</div>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No new alerts to display.</p>
        )}
      </div>
    </div>
  );
}
