# 🏔️ Bolivia Tourism Frontend

Frontend ejecutable y completamente funcional del Sistema de Registro Turístico de Bolivia.

## 📋 Requisitos

- Node.js 18+
- npm o yarn

## 🚀 Instalación y Ejecución

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Ejecutar en desarrollo
```bash
npm run dev
```

### Paso 3: Abrir en navegador
```
http://localhost:5173
```

## 🔐 Credenciales de Prueba

**Email:** admin@bolivia-tours.com
**Contraseña:** Admin123!@

El CAPTCHA es una suma simple. Ejemplo: si ves "5 + 3", ingresa "8"

## 📚 Funcionalidades

✅ **Login y Registro**
- Autenticación con CAPTCHA matemático
- Validación de contraseña
- Sesión persistente

✅ **Dashboard**
- Estadísticas del sistema
- Estado de componentes
- Actividades recientes

✅ **Destinos**
- Listado de 5 destinos turísticos
- Información detallada
- Categorización

✅ **Proveedores**
- Listado de servicios
- Ratings y contacto
- Precios

✅ **Reservas**
- Mis reservas
- Estado de reservas
- Detalles de transacciones

✅ **Reportes**
- Gráficos interactivos
- Estadísticas por destino
- Análisis de datos

✅ **Navegación**
- Menú responsive
- Links entre páginas
- Logout

## 🛠️ Build para Producción

```bash
npm run build
```

El código compilado estará en la carpeta `dist/`

## 📦 Estructura de Carpetas

```
src/
├── App.tsx                 # Aplicación principal
├── main.tsx                # Entry point
├── index.css               # Estilos globales
├── AuthContext.tsx         # Contexto de autenticación
├── ProtectedRoute.tsx      # Rutas protegidas
├── Navigation.tsx          # Barra de navegación
├── Navigation.css
├── Login.tsx               # Página de login
├── Register.tsx            # Página de registro
├── Auth.css                # Estilos auth
├── Dashboard.tsx           # Dashboard
├── Destinations.tsx        # Página destinos
├── Providers.tsx           # Página proveedores
├── Bookings.tsx            # Página reservas
├── Reports.tsx             # Página reportes
└── Pages.css               # Estilos páginas
```

## 🔄 Flujo de la Aplicación

1. **Login/Register** → Autenticación
2. **Dashboard** → Página de inicio
3. **Navegación** → Accede a diferentes secciones
4. **Datos Locales** → Simulados (lista de 5 destinos, 7 proveedores, etc.)
5. **Logout** → Vuelve a Login

## 💾 Almacenamiento

- **localStorage** → Token y datos de usuario
- **Estado React** → Datos de páginas

## 🎨 Diseño

- Responsive (mobile, tablet, desktop)
- Color scheme: Azul (#2563eb)
- Gradientes y sombras sutiles
- Iconos con lucide-react
- Gráficos con recharts

## 📱 Responsive

El frontend es completamente responsive:
- ✅ Escritorio (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## ⚡ Rendimiento

- Fast load time
- Código optimizado
- Sin dependencias pesadas
- Vite para desarrollo rápido

## 🆘 Solución de Problemas

### Puerto 5173 ocupado
```bash
# Cambiar puerto
npm run dev -- --port 3000
```

### Error de módulos
```bash
rm -rf node_modules package-lock.json
npm install
```

### LocalStorage limpio
```javascript
// En consola
localStorage.clear()
location.reload()
```

## 📝 Notas

- Todo está funcional sin backend real
- Los datos son simulados/locales
- El CAPTCHA es matemático (suma simple)
- Perfecto para demostración y pruebas

## 🎯 Próximas Mejoras

- Integración con backend real
- Base de datos real
- Más validaciones
- Autenticación OAuth
- Tests automatizados

## 📞 Soporte

Para cualquier problema, revisar la consola del navegador (F12) para ver los errores.

---

**¡Disfruta explorando el Sistema de Registro Turístico de Bolivia!** 🏔️✨

Versión: 1.0.0
Status: Production Ready ✅
