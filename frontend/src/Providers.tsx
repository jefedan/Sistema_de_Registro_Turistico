import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import './Pages.css';

interface Provider {
  id: string;
  name: string;
  type: string;
  destination: string;
  rating: number;
  price: number;
  contact: string;
  phone: string;
}

export const Providers: React.FC = () => {
  const [providers] = useState<Provider[]>([
    {
      id: '1',
      name: 'Uyuni Turismo Premium',
      type: 'Tour',
      destination: 'Salar de Uyuni',
      rating: 4.8,
      price: 250,
      contact: 'info@uyuniturismo.com',
      phone: '+591-2-2445678'
    },
    {
      id: '2',
      name: 'Hotel Luna Salada',
      type: 'Hotel',
      destination: 'Salar de Uyuni',
      rating: 4.6,
      price: 120,
      contact: 'reservas@lunasalada.com',
      phone: '+591-2-2441000'
    },
    {
      id: '3',
      name: 'Hotel Plaza Mayor',
      type: 'Hotel',
      destination: 'La Paz',
      rating: 4.7,
      price: 180,
      contact: 'reservas@plazamayor.com',
      phone: '+591-2-2312345'
    },
    {
      id: '4',
      name: 'Restaurante Khena',
      type: 'Restaurante',
      destination: 'La Paz',
      rating: 4.5,
      price: 35,
      contact: 'khena@dining.com',
      phone: '+591-2-2387654'
    },
    {
      id: '5',
      name: 'Tours Isla del Sol',
      type: 'Tour',
      destination: 'Isla del Sol',
      rating: 4.6,
      price: 85,
      contact: 'tours@islasol.com',
      phone: '+591-2-2453214'
    },
    {
      id: '6',
      name: 'Madidi Explorer',
      type: 'Aventura',
      destination: 'Parque Nacional Madidi',
      rating: 4.9,
      price: 350,
      contact: 'explorer@madidi.com',
      phone: '+591-3-8765432'
    },
    {
      id: '7',
      name: 'Tours Cerro Rico',
      type: 'Tour',
      destination: 'Potosí',
      rating: 4.4,
      price: 60,
      contact: 'info@cerrorico.com',
      phone: '+591-2-6234567'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hotel': return '#8b5cf6';
      case 'Tour': return '#3b82f6';
      case 'Restaurante': return '#f59e0b';
      case 'Aventura': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.floor(rating) ? '#fbbf24' : '#e5e7eb'}
            color={i < Math.floor(rating) ? '#fbbf24' : '#e5e7eb'}
          />
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏢 Proveedores de Servicios</h1>
        <p>Encuentra los mejores servicios turísticos</p>
      </div>

      <div className="providers-list">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card card">
            <div className="provider-header">
              <div>
                <h3>{provider.name}</h3>
                <p className="provider-destination">{provider.destination}</p>
              </div>
              <span 
                className="type-badge"
                style={{ backgroundColor: getTypeColor(provider.type) }}
              >
                {provider.type}
              </span>
            </div>

            <div className="provider-rating">
              {renderStars(provider.rating)}
            </div>

            <div className="provider-contact">
              <div className="contact-item">
                <Mail size={18} />
                <span>{provider.contact}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>{provider.phone}</span>
              </div>
            </div>

            <div className="provider-price">
              <span className="price-label">Precio</span>
              <span className="price-value">${provider.price}</span>
            </div>

            <button className="btn btn-primary btn-block">
              Contactar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
