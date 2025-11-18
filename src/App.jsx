import React from 'react';
import { Navbar, Footer } from './components';
import { Home } from './pages';

/**
 * Main App Component
 * Single page scroll layout
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content - Single Page */}
      <main className="flex-grow">
        <Home />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

