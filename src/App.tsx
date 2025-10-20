import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FormWizard } from './features/form-wizard/FormWizard';
import { LanguageSwitcher } from './shared/ui/LanguageSwitcher';
import './shared/config/i18n';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Social Support Portal
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
        
        <main className="animate-fade-in">
          <FormWizard />
        </main>
        
        <footer className="border-t bg-white/50 backdrop-blur-sm mt-8">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Social Support Portal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;