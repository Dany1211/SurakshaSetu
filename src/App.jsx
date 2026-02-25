import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskMonitoring from './pages/RiskMonitoring';
import EvacuationPlanning from './pages/EvacuationPlanning';
import ResourceAllocation from './pages/ResourceAllocation';
import Alerts from './pages/Alerts';
import CycloneMonitoring from './pages/CycloneMonitoring';
import WildfireMonitoring from './pages/WildfireMonitoring';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { initializeResources, createSOSTicket } from './services/firebaseService';
import { useFirebaseSync } from './hooks/useFirebaseSync';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { systemRisk } = useFirebaseSync();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // EWS Auditory and System Notification trigger
    if (systemRisk === 'HIGH') {
      if (Notification.permission === 'granted') {
        new Notification('⚠️ EWS RED ALERT', {
          body: 'Critical flood risk detected in multiple wards. Immediate action required.',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('⚠️ EWS RED ALERT', {
              body: 'Critical flood risk detected. Immediate action required.'
            });
          }
        });
      }

      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg');
      audio.volume = 0.4;
      audio.play().catch(e => console.log('Audio autoplay blocked by browser', e));
    }
  }, [systemRisk]);

  useEffect(() => {
    // One time seeder for the demo so Firebase isn't completely empty
    const seedFirebase = async () => {
      if (!localStorage.getItem('firebase_seeded')) {
        await initializeResources({
          buses: { total: 450, active: 112 },
          boats: { total: 45, active: 18 },
          ambulances: { total: 110, active: 40 }
        });

        // Seed some mock SOS tickets
        const mockSOS = [
          { caller: 'Ramesh Patil', location: 'Kurla West, Near Station', issue: 'Family stranded on 2nd floor', time: 'Just now', urgent: true, phone: '+91 98XXX XXXXX' },
          { caller: 'Anjali Deshmukh', location: 'Sion Circle, Main Road', issue: 'Elderly person needs medical help', time: 'Just now', urgent: true, phone: '+91 97XXX XXXXX' },
          { caller: 'Municipal Ward Office', location: 'Andheri Subway', issue: 'Water level rising rapidly', time: 'Just now', urgent: false, phone: '022-2XXX XXXX' }
        ];

        for (const ticket of mockSOS) {
          await createSOSTicket(ticket);
        }

        localStorage.setItem('firebase_seeded', 'true');
        console.log("Firebase seeded automatically.");
      }
    };
    seedFirebase();
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'risk_monitoring':
        return <RiskMonitoring />;
      case 'evacuation_planning':
        return <EvacuationPlanning />;
      case 'resource_allocation':
        return <ResourceAllocation />;
      case 'cyclones':
        return <CycloneMonitoring />;
      case 'wildfires':
        return <WildfireMonitoring />;
      case 'alerts':
      case 'sos':
        return <Alerts initialTab={activePage === 'alerts' ? 'weather' : 'sos'} />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  const isRedAlert = systemRisk === 'HIGH';

  if (loadingAuth) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans">
          <div style={{ width: 40, height: 40, border: '4px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
      </LanguageProvider>
    );
  }

  if (!user) {
    return (
      <LanguageProvider>
        <Login />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className={`min-h-screen bg-slate-50 flex flex-col font-sans relative ${isRedAlert ? 'ring-8 ring-red-600 ring-inset' : ''}`}>
        {isRedAlert && (
          <div style={{
            background: '#dc2626', color: 'white', padding: '8px', textAlign: 'center',
            fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            ⚠️ RED ALERT: Critical Flood Risk Detected. Enact Evacuation Protocols. ⚠️
          </div>
        )}
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isRedAlert={isRedAlert}
          onPageChange={setActivePage}
        />
        <div className="flex overflow-hidden relative" style={{ height: `calc(100vh - 52px ${isRedAlert ? '- 36px' : ''})` }}>
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