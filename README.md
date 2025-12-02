# Intelligent Accounting Assistant

A modern web application that converts natural language transaction descriptions into accounting journal entries using AI. Built with React, FastAPI, and Google's Gemini AI.

## Features

- **Natural Language Processing**: Convert plain English/French transaction descriptions into structured accounting entries
- **T-Account Visualization**: Visual representation of debits and credits for each account
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Bilingual Support**: Interface available in both English and French
- **Real-time Processing**: Instant conversion of transactions using AI

## Project Structure

```
Managment/
├── backend/              # FastAPI backend with Gemini AI integration
│   ├── main.py          # Main API endpoints
│   ├── .env             # Environment variables
│   └── ...              
├── frontend/             # React frontend with Vite
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── ...
│   ├── package.json     # Frontend dependencies
│   └── ...
└── README.md            # This file
```

## Tech Stack

### Frontend
- **React 18** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Lucide React** - Beautiful SVG icons
- **Axios** - Promise based HTTP client

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Google Gemini AI** - Advanced language model for transaction analysis
- **Python 3.8+** - Programming language

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Managment
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup:**
   ```bash
   cd ../backend
   pip install fastapi uvicorn python-dotenv google-generativeai
   ```

4. **Environment Variables:**
   Create a `.env` file in the backend directory:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`

2. **Start the Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Usage

1. Open the application in your browser at `http://localhost:5173`
2. Enter a transaction description in plain English or French (e.g., "Paid electricity bill of 1500 DH by cash")
3. Click "Generate T-Accounts"
4. View the generated journal entry with debits and credits
5. Click "Submit Another Transaction" to process more entries

## Example Transactions

- "Paid electricity bill of 1500 DH by cash"
- "Sold goods on credit for 5000 DH"
- "Purchased office supplies for 800 DH on credit"
- "Purchase of store furniture paid by cheque, 2486 DH"

## API Endpoints

- `POST /analyze` - Process transaction description and return journal entry

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for natural language processing capabilities
- Tailwind Labs for the excellent CSS framework
- The React and FastAPI communities for amazing documentation and tools