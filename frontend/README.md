# Kura K Ho - AI-Powered News Fact Checker

A modern chatbot application for fact-checking news, summarizing articles, and providing personalized news feeds. Built with React, TypeScript, and Tailwind CSS, inspired by t3.chat design.

## Features

### 1. Fact-Checking News
- Verify the accuracy of news claims with AI-powered fact-checking
- Get confidence scores and detailed explanations
- View reliable sources and citations
- See related news articles

### 2. Personalized News Feed
- Customize your news preferences (categories, regions, languages)
- Receive tailored news recommendations
- Filter by verified sources
- Quick actions to summarize or fact-check articles

### 3. News Summarization
- Get concise summaries of lengthy articles
- Extract key points automatically
- Sentiment analysis of news content
- Save reading time

## Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS v4 with custom components
- **Routing:** React Router DOM
- **State Management:** Zustand with persistence
- **HTTP Client:** Axios
- **UI Components:** Custom components built with Radix UI primitives
- **Icons:** Lucide React
- **Build Tool:** Vite

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── chat/           # Chat interface components
│   │   ├── news/           # News feed components
│   │   ├── layout/         # Layout components (Navbar, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Login.tsx       # Login page
│   │   ├── Signup.tsx      # Signup page
│   │   ├── Preferences.tsx # User preferences
│   │   ├── Chat.tsx        # Chat interface
│   │   └── NewsFeed.tsx    # News feed page
│   ├── services/           # API service layer
│   │   ├── api.ts          # Base API service
│   │   ├── authService.ts  # Authentication APIs
│   │   ├── chatService.ts  # Chat APIs
│   │   └── newsService.ts  # News APIs
│   ├── store/              # Zustand stores
│   │   ├── useAuthStore.ts # Auth state management
│   │   ├── useChatStore.ts # Chat state management
│   │   └── useNewsStore.ts # News state management
│   ├── types/              # TypeScript type definitions
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # App entry point
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### For Unauthenticated Users
- Browse the landing page to learn about features
- Try the chat interface for fact-checking
- View general news feed

### For Authenticated Users
1. **Sign Up**: Create an account with email and password
2. **Set Preferences**: Select your preferred news categories, regions, and languages
3. **Use Chat**: 
   - Switch between Fact Check, Summarize, and General modes
   - Ask questions about news
   - Get AI-powered responses with sources
4. **News Feed**: 
   - View personalized news based on your preferences
   - Quick actions to summarize or fact-check articles
   - Read full articles from original sources

## API Integration

The frontend expects the following API endpoints from the backend:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/preferences` - Update user preferences
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/chat` - Send chat message
- `POST /api/chat/fact-check` - Fact-check a claim
- `POST /api/chat/summarize` - Summarize news article
- `GET /api/chat/history/:sessionId` - Get chat history

### News
- `GET /api/news` - Get general news
- `GET /api/news/personalized` - Get personalized news
- `GET /api/news/:id` - Get news article by ID
- `GET /api/news/trending` - Get trending news

## State Management

The application uses Zustand for state management with three main stores:

1. **Auth Store**: User authentication and preferences
2. **Chat Store**: Chat messages, sessions, and modes
3. **News Store**: News articles and selected article

Authentication state is persisted to localStorage for session management.

## Styling

The project uses Tailwind CSS v4 with custom components following the shadcn/ui design system. The design is inspired by t3.chat with:
- Clean, modern interface
- Responsive design
- Dark mode support (via Tailwind)
- Gradient backgrounds
- Smooth animations

## Contributing

When adding new features:
1. Create components in the appropriate directory
2. Add TypeScript types in `src/types`
3. Use existing UI components for consistency
4. Follow the established patterns for API calls and state management

## License

[Your License Here]
