import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Download, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
                Resume Builder
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/templates">
                <a className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Templates
                </a>
              </Link>
              <Link href="/dashboard">
                <a className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  My Resumes
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Create Your Perfect</span>
            <span className="block text-blue-600">Resume with AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Build professional resumes with AI-powered content suggestions, modern templates, and instant PDF export.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/resume">
                <Button size="lg" className="w-full">
                  Start Building Now
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/templates">
                <Button variant="outline" size="lg" className="w-full">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to build a great resume
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">AI-Powered Content</p>
                  <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                    Generate professional summaries, job descriptions, and skills with AI assistance.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Modern Templates</p>
                  <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                    Choose from professionally designed templates that make you stand out.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Download className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">PDF Export</p>
                  <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                    Download your resume as a high-quality PDF ready for applications.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Star className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">ATS Optimized</p>
                  <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                    All templates are designed to pass Applicant Tracking Systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}