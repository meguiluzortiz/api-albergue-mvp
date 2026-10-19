# API REST - MVP Albergue Lima Norte

API sencilla desarrollada con Node.js + Express, siguiendo buenas practicas basicas para un MVP:

- Separacion por capas (routes, controllers, services)
- Validacion con Zod
- Manejo de errores centralizado
- Seguridad con JWT y bcrypt
- Subida de archivos para comprobantes
- Variables de entorno

## Requisitos

- Node.js 18+
- npm

## Instalacion

```bash
npm install
cp .env.example .env
```

## Ejecutar

```bash
npm run dev
```

## Endpoints principales

### Public
- GET /api/v1/pets
- GET /api/v1/pets/:petId
- POST /api/v1/sponsorships
- POST /api/v1/sponsorships/:sponsorshipId/receipt
- POST /api/v1/adoptions/pre-evaluations
- GET /api/v1/adoptions/pre-evaluations/:preEvaluationId/whatsapp-link

### Auth
- POST /api/v1/auth/login

### Admin
- GET /api/v1/admin/sponsorships
- GET /api/v1/admin/sponsorships/:sponsorshipId
- PATCH /api/v1/admin/sponsorships/:sponsorshipId/review
- POST /api/v1/pets
- PATCH /api/v1/pets/:petId

## Credenciales por defecto

Email: `admin@albergue.pe`
Password: `Admin12345`

## Nota

Este MVP usa almacenamiento en memoria y archivos locales para simplificar la implementacion. Para produccion, se recomienda PostgreSQL + almacenamiento cloud.
