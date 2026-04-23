import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';
import './Pages.css';

export const Reports: React.FC = () => {
  const visitorsData = [
    { name: 'Uyuni', visitors: 50000 },
    { name: 'La Paz', visitors: 80000 },
    { name: 'Isla del Sol', visitors: 35000 },
    { name: 'Madidi', visitors: 25000 },
    { name: 'Potosí', visitors: 40000 }
  ];

  const categoryData = [
    { name: 'Natural', value: 50000 },
    { name: 'Cultural', value: 75000 },
    { name: 'Adventure', value: 25000 },
    { name: 'Urban', value: 80000 }
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981'];

  const bookingStats = [
    { month: 'Enero', bookings: 12 },
    { month: 'Febrero', bookings: 19 },
    { month: 'Marzo', bookings: 15 },
    { month: 'Abril', bookings: 22 },
    { month: 'Mayo', bookings: 28 },
    { month: 'Junio', bookings: 35 }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📊 Reportes y Estadísticas</h1>
        <p>Análisis de datos del sistema</p>
        <button className="btn btn-primary mt-20">
          <Download size={18} /> Descargar Reporte PDF
        </button>
      </div>

      <div className="reports-grid">
        <div className="card">
          <h2>Visitantes por Destino</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Distribución por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2>Reservas por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-summary card mt-20">
        <h2>Resumen General</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Visitantes</span>
            <span className="summary-value">230,000</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Reservas</span>
            <span className="summary-value">131</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Ingresos Totales</span>
            <span className="summary-value">$18,500</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Tasa de Ocupación</span>
            <span className="summary-value">87%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
