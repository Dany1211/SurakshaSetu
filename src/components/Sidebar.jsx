import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
    const { t } = useLanguage();
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'menu.dashboard' },
        { id: 'risk_monitoring', label: 'menu.risk_monitoring' },
        { id: 'evacuation_planning', label: 'menu.evacuation_planning' },
        { id: 'resource_allocation', label: 'menu.resource_allocation' },
        { id: 'alerts', label: 'menu.alerts' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-65px)] overflow-y-auto hidden md:block shrink-0">
            <div className="py-6 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveItem(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${activeItem === item.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {t(item.label)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
