Prosta aplikacja typu forum/tablica ogłoszeń dla mieszkańców jednego osiedla lub dzielnicy.
Umożliwia publikowanie lokalnych ogłoszeń, zadawanie pytań oraz komentowanie postów.

**Backend**
- Node.js
- Express
- TypeScript
- PostgreSQL
- Docker (Postgres)
- node-pg-migrate

**Frontend**
- React
- TypeScript
- Vite
- React Router

## Uruchomienie projektu (dev)

### 1. Wymagania
- Node.js (>=18)
- Docker + Docker Compose

---

### 2. Uruchomienie bazy danych
docker compose up -d

---

### 3. Uruchomienie backend
cd backend__
npm install__
npm run migrate__
npm run dev

---

### 4. Uruchomienie frontend
cd frontend__
npm install__
npm run dev
