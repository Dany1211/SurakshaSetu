import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskMonitoring from './pages/RiskMonitoring';
import EvacuationPlanning from './pages/EvacuationPlanning';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'risk_monitoring':
        return <RiskMonitoring />;
      case 'evacuation_planning':
        return <EvacuationPlanning />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex overflow-hidden relative" style={{ height: 'calc(100vh - 52px)' }}>
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activePage={activePage}
            onPageChange={setActivePage}
          />
          <main className="flex-1 overflow-y-auto w-full">
            {renderPage()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;