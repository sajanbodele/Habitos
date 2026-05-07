# Habitos — Adaptive Habit Tracking App

Adaptive, simple habit tracking powered by behavioral insights to help users build lasting routines in seconds.

## Overview

Habitos is a modern habit tracking application designed to make building routines simple, motivating, and sustainable. The app focuses on minimal friction, daily consistency tracking, and behavioral reinforcement through a clean, distraction-free user experience.

Built using the Base44 platform with a modern React + Vite frontend architecture.

## Features

- 🎯 **Create and Manage Habits** - Effortlessly set up new habits with minimal configuration
- 📊 **Daily Progress Tracking** - Log your daily progress and stay accountable
- 🔥 **Habit Streak Monitoring** - Watch your streaks grow and stay motivated
- 🎨 **Clean and Responsive UI** - Beautiful design that works on all devices
- ⚡ **Fast Performance** - Built with Vite for instant load times
- 🔐 **Authentication Support** - Secure user accounts powered by Base44
- 📁 **File Upload Integration** - Support for media and file attachments
- 🔗 **Base44 Backend Integration** - Reliable backend services and database

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Language**: JavaScript
- **Backend Services**: Base44
- **Architecture**: Modern component-based architecture

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Application pages/screens
├── entities/        # Base44 data entities
├── integrations/    # External integrations
├── hooks/           # Custom React hooks
├── utils/           # Utility/helper functions
└── App.jsx          # Main application entry
```

## Getting Started

### Prerequisites

Make sure you have installed:
- Node.js (v18 or later recommended)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/habitos.git
```

2. **Navigate to the project directory**
```bash
cd habitos
```

3. **Install dependencies**
```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory with your Base44 configuration:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

**Example:**
```env
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://your-project.db.app
```

## Running the Application

### Development Server

Start the local development server:

```bash
npm run dev
```

The app will be available at:
```
http://localhost:5173
```

### Production Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

You can deploy the frontend using platforms such as:
- **Vercel**
- **Netlify**
- **Render**
- **GitHub Pages**

**Important**: Ensure the correct environment variables are configured during deployment with your Base44 credentials.

## Base44 Integration

This project leverages Base44 services for:

| Service | Purpose |
|---------|---------|
| **db.auth** | User authentication and account management |
| **db.entities** | Database schema and data management |
| **db.integrations** | External service integrations |
| **db.files** | File upload and storage |

## Development Workflow

1. Make changes locally in your feature branch
2. Test using `npm run dev`
3. Verify functionality across browsers/devices
4. Commit changes with descriptive messages
5. Push to GitHub
6. Open a pull request
7. Publish updates from Base44 Builder if required

## Contributing

Contributions, suggestions, and improvements are welcome! We'd love your input on making Habitos better.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Author

Built with passion to simplify habit building and help users create meaningful daily routines.
