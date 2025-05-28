# Personal Website

A modern personal website built with Python (FastAPI) and TypeScript (React).

## Features

- Modern, responsive design
- FastAPI backend with TypeScript/React frontend
- Project showcase
- About section
- Contact information
- Smooth animations with Framer Motion

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup

### Backend Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Run the backend server:

```bash
cd backend
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Project Structure

```
.
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── requirements.txt
└── README.md
```

## Customization

1. Update the personal information in `backend/main.py`
2. Modify the components in `frontend/src/components/`
3. Add your own projects and content
4. Customize the styling using Tailwind CSS

## License

MIT
