import React from 'react';
import { useAuth } from './AuthContext';
import { BarChart3, MapPin, Users, Calendar, TrendingUp } from 'lucide-react';
import './Pages.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <MapPin size={32} />, label: 'Destinos', value: '5', color: '#3b82f6' },
    { icon: <Users size={32} />, label: 'Proveedores', value: '7', color: '#8b5cf6' },
    { icon: <Calendar size={32} />, label: 'Reservas', value: '2', color: '#ec4899' },
    { icon: <BarChart3 size={32} />, label: 'Usuarios', value: '1', color: '#f59e0b' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Bienvenido, {user?.firstName} {user?.lastName}! 👋</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-20">
        <h2>📊 Estado del Sistema</h2>
        <div className="system-status">
          <div className="status-item">
            <span className="status-badge success">✓</span>
            <div>
              <p className="status-title">Base de Datos</p>
              <p className="status-desc">Conectada y operacional</p>
            </div>
          </div>
          <div className="status-item">
            <span className="status-badge success">✓</span>
            <div>
              <p className="status-title">API Backend</p>
              <p className="status-desc">En línea</p>
            </div>
          </div>
          <div className="status-item">
            <span className="status-badge success">✓</span>
            <div>
              <p className="status-title">Autenticación</p>
              <p className="status-desc">Sesión activa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-20">
        <h2>🗓️ Actividades Recientes</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p className="activity-title">Iniciaste sesión</p>
              <p className="activity-time">Hace unos momentos</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🏔️</div>
            <div className="activity-content">
              <p className="activity-title">Destinos disponibles</p>
              <p className="activity-time">5 destinos turísticos</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🏨</div>
            <div className="activity-content">
              <p className="activity-title">Proveedores activos</p>
              <p className="activity-time">7 servicios disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
