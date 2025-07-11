import { QueryClientProvider } from '@tanstack/react-query';
import { Router, Route, Switch } from 'wouter';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage';
import ResumeBuilder from './pages/ResumeBuilder';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Router>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/templates" component={Templates} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/resume/:id?" component={ResumeBuilder} />
              <Route>
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Page not found</p>
                  </div>
                </div>
              </Route>
            </Switch>
          </Router>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;