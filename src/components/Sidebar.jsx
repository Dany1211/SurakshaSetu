import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Activity, Map, Users, AlertTriangle, ChevronRight, X } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'menu.dashboard', icon: LayoutDashboard },
        { id: 'risk_monitoring', label: 'menu.risk_monitoring', icon: Activity },
        { id: 'evacuation_planning', label: 'menu.evacuation_planning', icon: Map },
        { id: 'resource_allocation', label: 'menu.resource_allocation', icon: Users },
        { id: 'alerts', label: 'menu.alerts', icon: AlertTriangle },
        { id: 'cyclones', label: 'Cyclones (Info)', icon: Activity },
        { id: 'wildfires', label: 'Wildfires (Info)', icon: Activity },
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
                w-64 bg-white border-r border-slate-100 h-screen md:h-[calc(100vh-60px)] overflow-y-auto 
                transition-transform duration-300 ease-in-out md:translate-x-0
                ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
                shrink-0
            `}>
                <div className="py-6 px-3">
                    <div className="flex items-center justify-between mb-6 md:hidden px-2">
                        <Logo size="small" />
                        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-900">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        if (window.innerWidth < 768) onClose();
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${activeItem === item.id
                                        ? 'bg-suraksha-50 text-suraksha-600 border border-suraksha-100/50'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${activeItem === item.id ? 'text-suraksha-600' : 'text-slate-400'}`} />
                                    {t(item.label)}
                                    {activeItem === item.id && (
                                        <div className="ml-auto w-1 h-3 bg-suraksha-600 rounded-full" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 px-2">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 px-1">System Status</p>
                            <div className="flex items-center gap-2 px-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[11px] font-bold text-slate-600 tracking-tight">ONLINE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
