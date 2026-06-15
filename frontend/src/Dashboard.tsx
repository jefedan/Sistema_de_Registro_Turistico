import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  visitors: number;
  price: number;
  description: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('destinations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('destinations');
      }
    }
    return [
      {
        id: '1',
        name: 'Salar de Uyuni',
        region: 'Potosí y Oruro',
        category: 'Natural',
        visitors: 50000,
        price: 50,
        description: 'El mayor salar del mundo'
      },
      {
        id: '2',
        name: 'La Paz',
        region: 'La Paz',
        category: 'Urban',
        visitors: 80000,
        price: 20,
        description: 'Capital administrativa'
      },
      {
        id: '3',
        name: 'Isla del Sol',
        region: 'La Paz',
        category: 'Cultural',
        visitors: 35000,
        price: 30,
        description: 'Isla sagrada en el Lago Titicaca'
      },
      {
        id: '4',
        name: 'Parque Nacional Madidi',
        region: 'Beni',
        category: 'Adventure',
        visitors: 25000,
        price: 60,
        description: 'Área biodiversa del mundo'
      },
      {
        id: '5',
        name: 'Potosí - Cerro Rico',
        region: 'Potosí',
        category: 'Cultural',
        visitors: 40000,
        price: 35,
        description: 'Montaña emblemática'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('destinations', JSON.stringify(destinations));
  }, [destinations]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Destination, 'id'>>({
    name: '',
    region: '',
    category: 'Natural',
    visitors: 0,
    price: 0,
    description: ''
  });

  const handleOpenModal = (dest?: Destination) => {
    if (dest) {
      setEditingId(dest.id);
      setFormData({ name: dest.name, region: dest.region, category: dest.category, visitors: dest.visitors, price: dest.price, description: dest.description });
    } else {
      setEditingId(null);
      setFormData({ name: '', region: '', category: 'Natural', visitors: 0, price: 0, description: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.region) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (editingId) {
      setDestinations(destinations.map(d => d.id === editingId ? { ...formData, id: editingId } : d));
    } else {
      setDestinations([...destinations, { ...formData, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este destino?')) {
      setDestinations(destinations.filter(d => d.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '10px' }}>Dashboard</h1>
      <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '40px' }}>Bienvenido, {user?.firstName} {user?.lastName}! 👋</p>

      <div style={{ marginBottom: '30px' }}>
        <button onClick={() => handleOpenModal()} className="btn btn-success" style={{ marginBottom: '20px', padding: '12px 20px' }}>
          <Plus size={20} /> Nuevo Destino
        </button>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>🗺️ Destinos Turísticos</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Región</th>
              <th>Categoría</th>
              <th>Visitantes</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id}>
                <td>{dest.name}</td>
                <td>{dest.region}</td>
                <td><span className="badge badge-info">{dest.category}</span></td>
                <td>{dest.visitors.toLocaleString()}</td>
                <td>${dest.price}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleOpenModal(dest)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                      <Edit2 size={16} /> Editar
                    </button>
                    <button onClick={() => handleDelete(dest.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Destino' : 'Nuevo Destino'}</h2>
              <button onClick={handleCloseModal} className="close-btn">&times;</button>
            </div>

            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre del destino"
              />
            </div>

            <div className="form-group">
              <label>Región *</label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="Región"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Natural</option>
                  <option>Cultural</option>
                  <option>Adventure</option>
                  <option>Urban</option>
                </select>
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Visitantes</label>
                <input
                  type="number"
                  value={formData.visitors}
                  onChange={(e) => setFormData({ ...formData, visitors: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción del destino"
                style={{ minHeight: '100px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleSave} className="btn btn-success" style={{ flex: 1 }}>
                Guardar
              </button>
              <button onClick={handleCloseModal} className="btn btn-secondary" style={{ flex: 1 }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

