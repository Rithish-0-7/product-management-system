# Full Stack Product Management System

Production-ready Product Management System with:
- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: Node.js + Express + TypeScript + Zod + Prisma (MVC)
- Database: PostgreSQL

## Features

- Product CRUD operations
- Pagination (`limit + offset`) with default limit `10`
- Case-insensitive search by name with `500ms` debounce
- Sorting (`name`, `price`, `stock`, `created_at`) with asc/desc
- Frontend + backend validation
- Loading, error, and empty states
- Optimistic UI update for delete action with rollback on failure
- Backend API tests (Jest + Supertest)
- Frontend component test (React Testing Library + Vitest)

## Project Structure

- `frontend/` React app
  - `src/components`
  - `src/pages`
  - `src/services`
  - `src/types`
  - `src/hooks`
  - `src/utils`
- `backend/` Express app
  - `src/controllers`
  - `src/routes`
  - `src/middlewares`
  - `src/models`
  - `src/validators`
  - `src/config`
  - `src/server.ts`

## Backend Setup

1. Copy env:
   - `backend/.env.example` -> `backend/.env`
2. Set `DATABASE_URL` in `backend/.env`
3. Install dependencies:
   - `cd backend`
   - `npm install`
4. Generate Prisma client:
   - `npm run prisma:generate`
5. Push schema to DB:
   - `npm run prisma:push`
6. Start backend:
   - `npm run dev`

Backend runs on `http://localhost:4000`.

## Frontend Setup

1. Copy env:
   - `frontend/.env.example` -> `frontend/.env`
2. Install dependencies:
   - `cd frontend`
   - `npm install`
3. Start frontend:
   - `npm run dev`

Frontend runs on `http://localhost:5173`.

## API

Base URL: `/api`

- `POST /products`
- `GET /products?page=1&limit=10&search=&sortBy=created_at&order=desc`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

Response for list:

```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

## Testing

- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## Deployment Guidance

- Frontend (Vercel): set `VITE_API_BASE_URL` to deployed backend URL + `/api`
- Backend (Render/Railway): set `DATABASE_URL`, `PORT`, `CORS_ORIGIN`
- Database (Supabase PostgreSQL): use the provided connection string as `DATABASE_URL`

## Security Notes

- Uses environment variables for secrets/config
- CORS enabled and configurable
- Validation and input sanitation via Zod
- SQL injection prevention through Prisma parameterized queries
