# ResumeDesigner 🚀

A modern, AI-powered resume builder that helps users create professional resumes with intelligent suggestions and customizable templates.

## 🌟 Features

- **AI-Powered Content Generation**: Leverage OpenAI to generate compelling resume content
- **Interactive Resume Builder**: Drag-and-drop interface with real-time preview
- **Multiple Templates**: Choose from various professional resume templates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Editing**: Live preview of changes as you build your resume
- **Export Options**: Download resumes in multiple formats
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Query** for state management and data fetching
- **Wouter** for client-side routing
- **Lucide React** for icons
- **Vite** for fast development and building

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **OpenAI API** for AI-powered content generation
- **Drizzle ORM** for database operations
- **CORS** for cross-origin resource sharing

## 📁 Project Structure

```
ResumeDesigner/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions and configurations
│   │   └── types/             # TypeScript type definitions
│   ├── public/                # Static assets
│   └── index.html             # Main HTML template
├── server/                    # Backend Node.js application
│   ├── routes/                # API route handlers
│   ├── db/                    # Database configuration and schemas
│   ├── ai/                    # AI integration logic
│   ├── storage/               # File storage utilities
│   └── index.ts               # Server entry point
├── dist/                      # Production build output
├── db/                        # Database files
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ResumeDesigner.git
   cd ResumeDesigner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Database Configuration
   DATABASE_URL=your_database_url_here
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the development servers**
   
   The project uses a monorepo structure. You can start both frontend and backend:
   
   ```bash
   # Start the backend server
   npm run server:dev
   
   # In another terminal, start the frontend
   npm run client:dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 📝 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the application for production
- `npm run client:dev` - Start only the frontend development server
- `npm run server:dev` - Start only the backend development server
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint for code linting

## 🔧 Configuration

### Database Setup

The project uses Drizzle ORM for database operations. Make sure to:

1. Set up your database connection in the `.env` file
2. Run migrations if needed:
   ```bash
   npm run db:migrate
   ```

### AI Integration

The application integrates with OpenAI for content generation:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env` file as `OPENAI_API_KEY`
3. Configure AI prompts in `server/ai/` directory

## 🎨 Customization

### Adding New Templates

1. Create a new template component in `client/src/components/templates/`
2. Add template metadata to the templates configuration
3. Update the template selector in the main application

### Styling

The project uses Tailwind CSS for styling. You can:

- Modify `tailwind.config.js` for custom theme settings
- Add custom styles in `client/src/styles/`
- Use Radix UI components for consistent accessibility

## 🔌 API Endpoints

### Resume Management
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

### AI Features
- `POST /api/ai/generate-content` - Generate AI-powered content
- `POST /api/ai/improve-text` - Improve existing text with AI

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This will create optimized production builds in the `dist/` directory.

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
NODE_ENV=production
OPENAI_API_KEY=your_production_openai_key
DATABASE_URL=your_production_database_url
PORT=3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Ensure code passes linting checks
- Update documentation when needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI-powered content generation
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- React team for the amazing framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/ResumeDesigner/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the issue

---

Built with ❤️ using React, TypeScript, and AI
