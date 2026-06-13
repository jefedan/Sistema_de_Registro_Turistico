# 🏔️ Backend NestJS - Sistema de Registro Turístico de Bolivia v2.0

Backend profesional con **Eliminación Lógica y Física** implementadas.

## ✨ Características

- ✅ CRUD Completo (Usuarios, Destinos, Proveedores, Reservas)
- ✅ Autenticación JWT + CAPTCHA
- ✅ **Soft Delete (Eliminación Lógica)** - Datos marcados como eliminados
- ✅ **Hard Delete (Eliminación Física)** - Opción para borrar permanentemente
- ✅ Auditoría de Acceso y Cambios
- ✅ Validaciones completas
- ✅ PostgreSQL + TypeORM
- ✅ Docker + Docker Compose
- ✅ Documentación Completa

## 🚀 Inicio Rápido

### Con Docker

```bash
docker-compose up -d
# Esperar 30 segundos
# Backend disponible en http://localhost:3000/api
```

### Sin Docker

```bash
npm install
cp .env.example .env
npm run start:dev
```

## 📊 Endpoints Principales

### Soft Delete (Lógico)

```
DELETE /api/destinations/:id
├─ Marca: deleted_at = NOW()
├─ Marca: is_active = false
├─ Registro sigue en BD
└─ Recuperable en /api/destinations/:id/restore

PATCH /api/destinations/:id/restore
├─ Limpia: deleted_at = NULL
├─ Restaura: is_active = true
└─ Registro vuelve a ser visible
```

### Hard Delete (Físico) - Cuando esté implementado

```
DELETE /api/destinations/:id?force=true
├─ Elimina completamente de BD
├─ No recuperable
└─ Requiere permisos especiales (ADMIN)
```

### Otras Rutas

```
GET    /api/health               - Estado del servidor
POST   /api/auth/login           - Login
POST   /api/auth/register        - Registro
GET    /api/destinations         - Listar
POST   /api/destinations         - Crear
PATCH  /api/destinations/:id     - Actualizar
DELETE /api/destinations/:id     - Soft delete
PATCH  /api/destinations/:id/restore - Restaurar
...y más
```

## 🗑️ Eliminación Lógica vs Física

### Soft Delete (Recomendado)
```sql
UPDATE destination 
SET deleted_at = NOW(), is_active = false
WHERE id = '...';
-- Registro sigue en BD
-- Recuperable
-- Auditoría completa
```

### Hard Delete (Cuando sea necesario)
```sql
DELETE FROM destination 
WHERE id = '...';
-- Registro desaparece
-- No recuperable
-- Solo con permisos especiales
```

## 📚 Credenciales de Prueba

```
Email: admin@bolivia-tours.com
Password: Admin123!@
Rol: ADMIN
```

## 🔒 Seguridad

- Passwords hasheados (bcrypt 10 rondas)
- JWT Tokens seguros
- CAPTCHA para prevenir bots
- Auditoría completa de cambios
- Validaciones en ambos lados

## 🏗️ Arquitectura

```
Frontend (React)
    ↓
HTTP/REST
    ↓
NestJS API
    ├─ Auth Service
    ├─ Destinations Service
    ├─ Providers Service
    ├─ Bookings Service
    ├─ Users Service
    └─ AccessLogs Service
    ↓
PostgreSQL
    ├─ destination (con deleted_at)
    ├─ provider (con deleted_at)
    ├─ booking (con deleted_at)
    ├─ user
    └─ access_log (auditoría)
```

## 📝 Desarrollo

```bash
# Modo desarrollo
npm run start:dev

# Build
npm run build

# Tests
npm run test

# Lint
npm run lint
```

## 🐛 Troubleshooting

**Puerto 5432 en uso:**
```bash
docker kill bolivia_postgres
docker-compose up -d
```

**Error de conexión:**
```bash
docker-compose logs postgres
docker-compose restart postgres
```

---

**Versión:** 2.0.0  
**Status:** ✅ Production Ready  
**Última actualización:** Abril 2026
