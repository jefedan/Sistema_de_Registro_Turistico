import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Download, Eye } from 'lucide-react';
import { generateTouristReceiptPDF, TouristReceipt } from './PDFService';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  provider: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  reference: string;
}

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('bookings');
      }
    }
    return [
      {
        id: '1',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        destination: 'Salar de Uyuni',
        provider: 'Uyuni Turismo Premium',
        checkIn: '2024-05-15',
        checkOut: '2024-05-18',
        guests: 2,
        totalPrice: 720,
        reference: 'BKG-001-2024'
      },
      {
        id: '2',
        firstName: 'María',
        lastName: 'García',
        email: 'maria@example.com',
        destination: 'La Paz',
        provider: 'Hotel Plaza Mayor',
        checkIn: '2024-06-01',
        checkOut: '2024-06-03',
        guests: 1,
        totalPrice: 240,
        reference: 'BKG-002-2024'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Booking, 'id' | 'reference'>>({
    firstName: '',
    lastName: '',
    email: '',
    destination: '',
    provider: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalPrice: 0
  });

  const handleOpenModal = (booking?: Booking) => {
    if (booking) {
      setEditingId(booking.id);
      const { reference, ...rest } = booking;
      setFormData(rest);
    } else {
      setEditingId(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        destination: '',
        provider: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        totalPrice: 0
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.destination) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (editingId) {
      setBookings(bookings.map(b => 
        b.id === editingId 
          ? { ...b, ...formData } 
          : b
      ));
    } else {
      const reference = `BKG-${String(bookings.length + 1).padStart(3, '0')}-${new Date().getFullYear()}`;
      setBookings([...bookings, { ...formData, id: Date.now().toString(), reference }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handlePrintReceipt = (booking: Booking) => {
    const receipt: TouristReceipt = {
      id: booking.id,
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      destination: booking.destination,
      provider: booking.provider,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      bookingRef: booking.reference,
      date: new Date().toLocaleDateString('es-ES')
    };
    generateTouristReceiptPDF(receipt);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '10px' }}>📅 Reservas Turísticas</h1>
      <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '40px' }}>Gestiona todas las reservas de turistas</p>

      <button onClick={() => handleOpenModal()} className="btn btn-success" style={{ marginBottom: '20px', padding: '12px 20px' }}>
        <Plus size={20} /> Nueva Reserva
      </button>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Destino</th>
              <th>Fechas</th>
              <th>Huéspedes</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.firstName} {booking.lastName}</td>
                <td>{booking.email}</td>
                <td>{booking.destination}</td>
                <td>{booking.checkIn} a {booking.checkOut}</td>
                <td>{booking.guests}</td>
                <td>${booking.totalPrice}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handlePrintReceipt(booking)} className="btn btn-warning" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                      <Download size={16} /> PDF
                    </button>
                    <button onClick={() => handleOpenModal(booking)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                      <Edit2 size={16} /> Editar
                    </button>
                    <button onClick={() => handleDelete(booking.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre *</label>
                <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="Nombre" />
              </div>
              <div className="form-group">
                <label>Apellido *</label>
                <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Apellido" />
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" />
            </div>

            <div className="form-group">
              <label>Destino *</label>
              <input value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="Destino" />
            </div>

            <div className="form-group">
              <label>Proveedor</label>
              <input value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} placeholder="Proveedor" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Check-in</label>
                <input type="date" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Check-out</label>
                <input type="date" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Huéspedes</label>
                <input type="number" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })} min="1" />
              </div>
              <div className="form-group">
                <label>Precio Total</label>
                <input type="number" value={formData.totalPrice} onChange={(e) => setFormData({ ...formData, totalPrice: parseFloat(e.target.value) })} placeholder="0.00" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleSave} className="btn btn-success" style={{ flex: 1 }}>
                Guardar
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

