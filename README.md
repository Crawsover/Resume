# Jeremy Crawford - Portfolio & System Builder

> **$6.3M in documented revenue** across legal, EdTech, and ecommerce. A full-stack portfolio showcasing CX/UX strategy, growth marketing, and AI systems expertise.

![Portfolio Preview](https://img.shields.io/badge/React-19.0.0-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.110.1-green) ![MongoDB](https://img.shields.io/badge/MongoDB-4.5.0-green)

## 🌟 Features

### Portfolio Website (`/`)
- **Luxurious Glassmorphism Design** - White/Black theme with yellow-gold (#FFD400) accents
- **Animated Hero Section** - GSAP-powered DataJourney pipeline visualization
- **6 Skill Clusters** - Collapsible cards with real use cases and proof of work
- **4 Case Studies** - Detailed project showcases with metrics ($6.3M revenue, 105% growth)
- **Interactive Elements** - Custom yellow cursor, scroll progress, parallax effects
- **20+ Tools Grid** - Tech stack showcase using Lucide React icons
- **Role Fit Analysis** - Dynamic progress bars showing expertise alignment

### System Builder (`/system-builder`)
- **4-Stage Workflow Builder** - Reveal → Prioritize → Assign → Activate
- **React Flow Canvas** - Drag-drop workflow visualization
- **3 Pre-built Templates** - High Intent Alert, Lead Enrichment, Sales Round Robin
- **Intent Scoring Configuration** - Customizable point values and thresholds
- **Lead Capture System** - Form validation with Zod
- **Auto-save Drafts** - Saves every 2 seconds to backend
- **Event Tracking** - Analytics for user interactions

## 🛠️ Tech Stack

### Frontend
- **React** 19.0.0 - UI framework
- **React Router** 7.5.1 - Client-side routing
- **React Flow** 11.11.4 - Workflow canvas
- **Zustand** 5.0.11 - State management
- **GSAP** 3.14.2 - Animations
- **Framer Motion** 12.34.0 - UI transitions
- **Tailwind CSS** 3.4.17 - Utility-first styling
- **shadcn/ui** - Pre-built components
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **FastAPI** 0.110.1 - API framework
- **Motor** 3.3.1 - Async MongoDB driver
- **Pydantic** 2.6.4 - Data validation
- **Python** 3.11+

## 📦 Installation

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB 4.5+

### Frontend Setup

```bash
cd frontend
yarn install
```

Create `frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Start development server:
```bash
yarn start
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db

# Optional - for System Builder integrations
RESEND_API_KEY=your_key
HUBSPOT_API_KEY=your_key
CLEARBIT_API_KEY=your_key
SLACK_WEBHOOK_URL=your_webhook
```

Start backend server:
```bash
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
yarn build
# Deploy the 'build' folder
```

### Backend (Railway/Render)
```bash
cd backend
# Set environment variables in your platform
# Deploy using requirements.txt
```

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/      # Portfolio components
│   │   ├── pages/           # System Builder pages
│   │   ├── store/           # Zustand stores
│   │   ├── hooks/           # Custom React hooks
│   │   ├── data/            # Mock data
│   │   └── App.js           # Main app with routing
│   └── package.json
│
├── backend/
│   ├── models/              # Pydantic models
│   ├── routes/              # API routes
│   │   └── system_builder.py
│   ├── server.py            # FastAPI app
│   └── requirements.txt
│
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: White (#FFFFFF)
- **Background**: Black (#0a0a0a) 
- **Accent**: Yellow (#FFD400)
- **Dark Gold**: #B8860B (for white backgrounds)
- **Text**: #8892a0 (gray)

### Typography
- **Display**: Bebas Neue
- **Body**: Instrument Sans
- **Mono**: JetBrains Mono

### Components
All components use glassmorphism with:
- `backdrop-filter: blur(20px)`
- `background: rgba(255, 255, 255, 0.04)`
- Subtle borders with transparency

## 🔌 API Endpoints

### Portfolio
- `GET /api/` - Health check
- `GET /api/status` - System status
- `POST /api/status` - Create status check

### System Builder
- `GET /api/system-builder/templates` - Get workflow templates
- `POST /api/system-builder/drafts` - Create draft
- `PUT /api/system-builder/drafts/{token}` - Update draft
- `GET /api/system-builder/drafts/{token}` - Get draft
- `POST /api/system-builder/leads` - Submit lead form
- `GET /api/system-builder/plan/{plan_token}` - Get setup plan
- `POST /api/system-builder/events` - Track events
- `GET /api/system-builder/integrations/status` - Integration status

## 🧪 Testing

### Frontend
```bash
cd frontend
yarn test
```

### Backend
```bash
cd backend
pytest
```

## 📝 License

MIT License - feel free to use this as inspiration for your own portfolio!

## 👤 Contact

**Jeremy Crawford**
- Email: CrawfordUXlab@gmail.com
- LinkedIn: [jeremy-crawford](https://www.linkedin.com/in/jeremy-crawford)
- Portfolio: [jcrawfordesigns.com](https://jcrawfordesigns.com)

---

**Built with:** React, FastAPI, MongoDB, GSAP, React Flow, and lots of ☕
