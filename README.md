# AI-Based Smart Complaint Management System

Fresh MERN stack project for the AIML case study with AI complaint analysis.

## Folder Structure

```text
ese_aifsd/
  backend/
  frontend/
```

## Backend .env

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
AI_API_KEY=your_ai_api_key
AI_MODEL=openai/gpt-4o-mini
```

## Run Backend

```bash
cd backend
npm install
node server.js
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Main APIs

```text
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/complaints
GET    /api/complaints
PUT    /api/complaints/:id
DELETE /api/complaints/:id
GET    /api/complaints/search?location=Ghaziabad
POST   /api/ai/analyze
```
