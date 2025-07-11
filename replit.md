# Overview

A modern, full-stack resume builder web application with AI-powered content generation and real-time preview. Users can create professional resumes using modern templates, generate content with AI assistance, and export to PDF. The application features a React frontend with TypeScript and a Node.js backend with OpenAI integration.

# System Architecture

## Technology Stack
- **Frontend**: React 19.1, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **AI Integration**: OpenAI API (GPT-4o)
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Styling**: Tailwind CSS with dark mode support
- **Forms**: React Hook Form with Zod validation

## Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages/routes
│   │   ├── lib/            # Utility functions and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
└── config files           # Vite, Tailwind, TypeScript configs
```

# Key Components

## Frontend Application
- **Resume Builder**: Interactive form-based editor with real-time preview
- **Template Selection**: Multiple professional resume templates
- **AI Content Generation**: Generate summaries, descriptions, and skills
- **Live Preview**: Real-time resume preview as you edit
- **Responsive Design**: Works on desktop and mobile devices

## Backend API
- **Resume Management**: CRUD operations for resume data
- **Template System**: Predefined professional templates
- **AI Integration**: OpenAI-powered content generation
- **Storage**: In-memory storage for development (easily extensible)

## AI Features
- **Professional Summaries**: Generate tailored professional summaries
- **Experience Descriptions**: Create compelling job descriptions
- **Skills Suggestions**: AI-recommended skills based on role/industry
- **Content Improvement**: Enhance existing resume content

# Data Flow

1. **User Input**: Users enter personal information, experience, education
2. **AI Enhancement**: Users can request AI-generated content for any section
3. **Real-time Preview**: Changes instantly reflect in resume preview
4. **Data Persistence**: Resume data saved via REST API
5. **Export Ready**: Formatted for PDF export and ATS compatibility

# External Dependencies

## Core Frontend Dependencies
- **React & React DOM**: v19.1.0 - Core UI framework
- **Vite**: v6.3.5 - Build tool and dev server
- **TanStack Query**: v5.81.5 - Server state management
- **Tailwind CSS**: v4.1.11 - Utility-first CSS framework
- **Radix UI**: Component primitives for accessibility

## Backend Dependencies
- **Express**: v5.1.0 - Web framework for Node.js
- **OpenAI**: v5.8.2 - AI content generation
- **CORS**: v2.8.5 - Cross-origin resource sharing
- **Zod**: v3.25.67 - TypeScript-first schema validation

# Deployment Strategy

## Development Setup
- **Frontend**: Vite dev server on port 5173
- **Backend**: Express server on port 3000
- **Proxy**: Frontend proxies API requests to backend

## Production Ready Features
- **Build Process**: Vite production build with optimization
- **TypeScript**: Full type safety across frontend and backend
- **Error Handling**: Comprehensive error boundaries and API error handling
- **SEO Optimization**: Meta tags and Open Graph support

# User Preferences

Preferred communication style: Simple, everyday language.

# Changelog

Changelog:
- July 01, 2025. Initial setup