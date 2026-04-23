import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Menu, X, LogOut, Home, MapPin, Users, Calendar, BarChart3 } from 'lucide-react';
import './Navigation.css';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          🏔️ Bolivia Tours
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link to="/dashboard" className="nav-link">
              <Home size={18} /> Dashboard
            </Link>
            <Link to="/destinations" className="nav-link">
              <MapPin size={18} /> Destinos
            </Link>
            <Link to="/providers" className="nav-link">
              <Users size={18} /> Proveedores
            </Link>
            <Link to="/bookings" className="nav-link">
              <Calendar size={18} /> Reservas
            </Link>
            <Link to="/reports" className="nav-link">
              <BarChart3 size={18} /> Reportes
            </Link>
          </div>

          <div className="navbar-user">
            <span className="user-info">
              👤 {user.firstName} {user.lastName}
            </span>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <LogOut size={18} /> Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
