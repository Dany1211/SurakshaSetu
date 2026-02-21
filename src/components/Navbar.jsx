import { useLanguage } from '../context/LanguageContext';
import { User, Bell, Menu } from 'lucide-react';
import Logo from './Logo';

const langFlags = {
    en: '🇬🇧',
    hi: '🇮🇳',
    mr: '🇮🇳',
};

const Navbar = ({ toggleSidebar }) => {
    const { language, setLanguage } = useLanguage();

    return (
        <nav style={{
            background: 'white', borderBottom: '1px solid #f1f5f9',
            padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000,
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Left: Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg md:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Logo />
            </div>

            {/* Right: Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* System Online */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#f0fdf4', borderRadius: '999px', border: '1px solid #dcfce7' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Online</span>
                </div>

                {/* Language Selector */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 12px', background: '#f8fafc', border: '1px solid #f1f5f9',
                    borderRadius: '8px',
                }}>
                    <span style={{ fontSize: '18px' }}>{langFlags[language]}</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            background: 'transparent', border: 'none', outline: 'none',
                            fontSize: '14px', fontWeight: 700, color: '#475569', cursor: 'pointer',
                            fontFamily: 'Outfit, sans-serif',
                        }}
                    >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="mr">MR</option>
                    </select>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '24px', background: '#f1f5f9' }} />

                {/* Notification Bell */}
                <button
                    style={{
                        position: 'relative', padding: '8px', background: 'none',
                        border: 'none', cursor: 'pointer', borderRadius: '8px',
                    }}
                    className="hover:bg-slate-50"
                >
                    <Bell style={{ width: '22px', height: '22px', color: '#94a3b8', strokeWidth: 1.8 }} />
                    <div style={{
                        position: 'absolute', top: '4px', right: '4px',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: '#ef4444', border: '2px solid white',
                    }} />
                </button>

                {/* Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px', borderRadius: '8px' }} className="hover:bg-slate-50">
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #dbeafe',
                    }}>
                        <User style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                    </div>
                    <span className="hidden lg:block" style={{ fontSize: '15px', fontWeight: 700, color: '#334155' }}>Admin</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
