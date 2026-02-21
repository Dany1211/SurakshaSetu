import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex overflow-hidden relative" style={{ height: 'calc(100vh - 52px)' }}>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 overflow-y-auto w-full">
            <Dashboard />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;