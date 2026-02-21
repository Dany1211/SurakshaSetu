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
            padding: '0 20px', height: '52px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50,
            fontFamily: 'Outfit, sans-serif',
        }}>
            {/* Left: Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <Logo />
            </div>

            {/* Right: Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* System Online */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#f0fdf4', borderRadius: '999px', border: '1px solid #dcfce7' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Online</span>
                </div>

                {/* Language Selector with Flag */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '4px 8px', background: '#f8fafc', border: '1px solid #f1f5f9',
                    borderRadius: '8px',
                }}>
                    <span style={{ fontSize: '14px' }}>{langFlags[language]}</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            background: 'transparent', border: 'none', outline: 'none',
                            fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer',
                            fontFamily: 'Outfit, sans-serif',
                        }}
                    >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="mr">MR</option>
                    </select>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '20px', background: '#f1f5f9' }} />

                {/* Notification Bell */}
                <button
                    style={{
                        position: 'relative', padding: '6px', background: 'none',
                        border: 'none', cursor: 'pointer', borderRadius: '8px',
                    }}
                    className="hover:bg-slate-50"
                >
                    <Bell style={{ width: '18px', height: '18px', color: '#94a3b8', strokeWidth: 1.8 }} />
                    {/* Badge */}
                    <div style={{
                        position: 'absolute', top: '2px', right: '2px',
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#ef4444', border: '2px solid white',
                    }} />
                </button>

                {/* Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px', borderRadius: '8px' }} className="hover:bg-slate-50">
                    <div style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #dbeafe',
                    }}>
                        <User style={{ width: '15px', height: '15px', color: '#2563eb' }} />
                    </div>
                    <span className="hidden lg:block" style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Admin</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
