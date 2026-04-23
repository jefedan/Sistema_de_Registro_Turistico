import React, { useState } from 'react';
import { MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import './Pages.css';

interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  visitors: number;
  price: number;
  description: string;
}

export const Destinations: React.FC = () => {
  const [destinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Salar de Uyuni',
      region: 'Potosí y Oruro',
      category: 'Natural',
      visitors: 50000,
      price: 50,
      description: 'El mayor salar del mundo con vistas espectaculares'
    },
    {
      id: '2',
      name: 'La Paz - Ciudad Maravillosa',
      region: 'La Paz',
      category: 'Urban',
      visitors: 80000,
      price: 20,
      description: 'Capital administrativa con arquitectura colonial'
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
      description: 'Una de las áreas más biodiversas del mundo'
    },
    {
      id: '5',
      name: 'Potosí - Cerro Rico',
      region: 'Potosí',
      category: 'Cultural',
      visitors: 40000,
      price: 35,
      description: 'Montaña emblemática con historia de plata'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Natural': return '#10b981';
      case 'Cultural': return '#f59e0b';
      case 'Adventure': return '#ef4444';
      case 'Urban': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏔️ Destinos Turísticos</h1>
        <p>Explora los mejores destinos de Bolivia</p>
      </div>

      <div className="destinations-grid">
        {destinations.map((dest) => (
          <div key={dest.id} className="destination-card card">
            <div className="destination-header">
              <h3>{dest.name}</h3>
              <span 
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(dest.category) }}
              >
                {dest.category}
              </span>
            </div>

            <p className="destination-description">{dest.description}</p>

            <div className="destination-info">
              <div className="info-item">
                <MapPin size={18} />
                <span>{dest.region}</span>
              </div>
              <div className="info-item">
                <Users size={18} />
                <span>{dest.visitors.toLocaleString()} visitantes</span>
              </div>
              <div className="info-item">
                <DollarSign size={18} />
                <span>${dest.price}/persona</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block">
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
