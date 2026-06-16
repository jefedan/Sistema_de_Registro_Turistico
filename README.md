# Sistema de Registro Turístico

Este repositorio contiene el frontend y backend de un sistema de registro turístico.

## Requisitos previos

- Node.js 18+ y npm
- Docker y Docker Compose (para la base de datos y backend con contenedor)
- Git (opcional)

---

## Backend

### 1. Instalar dependencias

En una terminal, ve a la carpeta del backend:

```bash
cd backend
npm install
```

### 2. Compilar el backend

```bash
npm run build
```

### 3. Ejecutar el backend

Puedes ejecutar el backend localmente con:

```bash
npm start
```

Esto arranca el servidor NestJS desde `dist/main.js`.

### 4. O usar Docker Compose

El repositorio incluye un `docker/docker-compose.yml` que arranca:

- PostgreSQL en el servicio `db`
- El backend en el servicio `backend`

Desde la carpeta `docker` ejecuta:

```bash
cd docker
docker compose up --build
```

Esto levanta la base de datos en `localhost:5432` y el backend en `localhost:3000`.

> Si ya está corriendo algún servicio en esos puertos, deténlo antes o ajusta el `docker-compose.yml`.

---

## Frontend

### 1. Instalar dependencias

En otra terminal, ve a la carpeta del frontend:

```bash
cd frontend
npm install
```

### 2. Ejecutar el frontend en modo desarrollo

```bash
npm run dev
```

Por defecto, Vite levantará la app en `http://localhost:5173`.

### 3. Vista previa de la build

Si deseas generar la versión de producción y revisarla en modo preview:

```bash
npm run build
npm run preview
```

---

## Secuencia recomendada para arrancar el proyecto

1. Abrir terminal y arrancar la base de datos y backend:

```bash
cd docker
docker compose up --build
```

2. En otra terminal, iniciar el frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Abrir el navegador en `http://localhost:5173`.

---


