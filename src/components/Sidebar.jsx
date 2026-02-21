import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Activity, Map, Users, AlertTriangle, X, Radio, Flame, CloudRain } from 'lucide-react';
import Logo from './Logo';
import { AnimatePresence, motion } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'menu.dashboard', icon: LayoutDashboard },
        { id: 'risk_monitoring', label: 'menu.risk_monitoring', icon: Activity },
        { id: 'evacuation_planning', label: 'menu.evacuation_planning', icon: Map },
        { id: 'resource_allocation', label: 'menu.resource_allocation', icon: Users },
        { id: 'alerts', label: 'menu.alerts', icon: AlertTriangle },
        { id: 'cyclones', label: 'Cyclones (Info)', icon: CloudRain },
        { id: 'wildfires', label: 'Wildfires (Info)', icon: Flame },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={`
                fixed md:sticky top-0 left-0 z-50
                w-60 bg-white border-r border-slate-100 h-screen md:h-[calc(100vh-52px)]
                transition-transform duration-300 ease-in-out md:translate-x-0
                ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
                shrink-0 flex flex-col
            `}>
                {/* Top section */}
                <div className="py-5 px-3 flex-1 overflow-y-auto custom-scrollbar">
                    {/* Mobile header */}
                    <div className="flex items-center justify-between mb-5 md:hidden px-2">
                        <Logo size="small" />
                        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-900">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Menu */}
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        if (window.innerWidth < 768) onClose();
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-semibold transition-all ${activeItem === item.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    <item.icon className={`w-[18px] h-[18px] stroke-[1.8] ${activeItem === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                                    {t(item.label)}
                                    {activeItem === item.id && (
                                        <div className="ml-auto w-1 h-4 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Emergency Broadcast — Bottom pinned */}
                <div className="p-3 border-t border-slate-100">
                    <button
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            padding: '10px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                            color: 'white', fontSize: '11px', fontWeight: 700, fontFamily: 'Outfit, sans-serif',
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                            boxShadow: '0 4px 14px -2px rgba(220, 38, 38, 0.4)',
                        }}
                    >
                        <Radio style={{ width: '14px', height: '14px' }} />
                        Emergency Broadcast
                    </button>
                    <p style={{ fontSize: '9px', color: '#94a3b8', textAlign: 'center', marginTop: '6px', fontWeight: 500 }}>
                        Sends mass SMS to all residents
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
