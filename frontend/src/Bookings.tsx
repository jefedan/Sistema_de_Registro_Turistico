import React, { useState } from 'react';
import { Calendar, Users, DollarSign, CheckCircle, Clock } from 'lucide-react';
import './Pages.css';

interface Booking {
  id: string;
  reference: string;
  provider: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: string;
}

export const Bookings: React.FC = () => {
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      reference: 'BKG-001-2024',
      provider: 'Uyuni Turismo Premium',
      checkIn: '2024-05-15',
      checkOut: '2024-05-18',
      guests: 2,
      total: 720,
      status: 'CONFIRMED'
    },
    {
      id: '2',
      reference: 'BKG-002-2024',
      provider: 'Hotel Plaza Mayor',
      checkIn: '2024-06-01',
      checkOut: '2024-06-03',
      guests: 1,
      total: 240,
      status: 'PENDING'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return '#10b981';
      case 'PENDING': return '#f59e0b';
      case 'CANCELLED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return <CheckCircle size={20} />;
      case 'PENDING': return <Clock size={20} />;
      default: return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📅 Mis Reservas</h1>
        <p>Gestiona tus reservas turísticas</p>
      </div>

      <button className="btn btn-primary mb-20">
        ➕ Nueva Reserva
      </button>

      <div className="bookings-list">
        {bookings.length === 0 ? (
          <div className="empty-state card">
            <p>No tienes reservas. ¡Crea una nueva!</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-card card">
              <div className="booking-header">
                <div>
                  <h3>{booking.provider}</h3>
                  <p className="booking-reference">Ref: {booking.reference}</p>
                </div>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {getStatusIcon(booking.status)}
                  {booking.status === 'CONFIRMED' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <span className="detail-label">Check-in</span>
                    <span className="detail-value">{booking.checkIn}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Calendar size={18} />
                  <div>
                    <span className="detail-label">Check-out</span>
                    <span className="detail-value">{booking.checkOut}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Users size={18} />
                  <div>
                    <span className="detail-label">Huéspedes</span>
                    <span className="detail-value">{booking.guests} persona(s)</span>
                  </div>
                </div>
                <div className="detail-item">
                  <DollarSign size={18} />
                  <div>
                    <span className="detail-label">Total</span>
                    <span className="detail-value">${booking.total}</span>
                  </div>
                </div>
              </div>

              <div className="booking-actions">
                <button className="btn btn-primary">Ver Detalles</button>
                {booking.status === 'PENDING' && (
                  <button className="btn btn-secondary">Cancelar</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
