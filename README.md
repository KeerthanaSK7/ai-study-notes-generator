# 🎓 AI Study Notes Generator

An intelligent web application that transforms lecture notes and PDFs into concise study materials including notes, flashcards, quizzes, and mind maps using AI.

## ✨ Features

- 📄 **PDF & Text Upload**: Parse lecture notes and PDF documents
- 📝 **Concise Notes Generation**: AI-powered summarization
- 🎴 **Flashcard Creation**: Auto-generated flashcards with Q&A
- 📋 **Quiz Generation**: Multiple-choice questions
- 🧠 **Mind Map Ideas**: Visual concept mapping
- 💾 **Save & Export**: Download materials as JSON or Markdown
- 🔐 **User Authentication**: Secure login with JWT
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Real-time Processing**: Instant AI generation

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Framer Motion for animations
- React Query for data fetching
- Zustand for state management

### Backend
- Node.js with Express
- TypeScript
- OpenAI API for AI features
- MongoDB for data persistence
- JWT for authentication
- Multer for file uploads

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- OpenAI API key

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your OpenAI API key and MongoDB URI to .env
npm run dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Access the app**
Open http://localhost:5173 in your browser

## 📊 Project Structure

```
ai-study-notes-generator/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   └── package.json
└── docker-compose.yml
```

## 🔑 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/study-notes
OPENAI_API_KEY=sk-...
JWT_SECRET=your-secret-key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Materials
- `POST /api/materials/upload` - Upload file
- `GET /api/materials` - Get user's materials
- `DELETE /api/materials/:id` - Delete material

### Generation
- `POST /api/generate/:id/notes` - Generate notes
- `POST /api/generate/:id/flashcards` - Generate flashcards
- `POST /api/generate/:id/quiz` - Generate quiz
- `POST /api/generate/:id/mindmap` - Generate mind map

### Export
- `GET /api/export/:id/json` - Export as JSON
- `GET /api/export/:id/markdown` - Export as Markdown

## 🔒 Security

- Password hashing with bcrypt
- JWT authentication
- Input validation & sanitization
- CORS protection
- Rate limiting

## 📝 License

MIT License

---

Made with ❤️ by KeerthanaSK7