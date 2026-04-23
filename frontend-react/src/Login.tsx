import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import './Auth.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captcha, setCaptcha] = useState<{ challenge: string; answer: string }>({ challenge: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({
      challenge: `${num1} + ${num2}`,
      answer: (num1 + num2).toString()
    });
    setCaptchaAnswer('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email) {
        setError('Por favor ingresa tu email');
        setLoading(false);
        return;
      }

      if (!password) {
        setError('Por favor ingresa tu contraseña');
        setLoading(false);
        return;
      }

      if (!captchaAnswer) {
        setError('Por favor completa el CAPTCHA');
        setLoading(false);
        return;
      }

      if (captchaAnswer !== captcha.answer) {
        setError('CAPTCHA incorrecto');
        generateCaptcha();
        setLoading(false);
        return;
      }

      await login(email, password);
      setSuccess('¡Login exitoso! Redirigiendo...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🏔️ Bolivia Tours</h1>
        <p className="auth-subtitle">Sistema de Registro Turístico</p>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <Mail size={20} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={20} />
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="captcha-box">
            <p className="captcha-challenge">¿Cuánto es {captcha.challenge}?</p>
            <input
              type="text"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Ingresa la respuesta"
              inputMode="numeric"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-block">
            {loading ? '⏳ Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>

        <div className="test-creds">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>📧 Email: admin@bolivia-tours.com</p>
          <p>🔐 Contraseña: Admin123!@</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#666' }}>
            CAPTCHA: Simplemente suma los números
          </p>
        </div>
      </div>
    </div>
  );
};
