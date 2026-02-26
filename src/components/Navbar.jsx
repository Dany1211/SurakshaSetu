// import { useState, useEffect } from 'react';
// import { useLanguage } from '../context/LanguageContext';
// import { User, Bell, Menu, ChevronDown, Globe } from 'lucide-react';
// import Logo from './Logo';

// const Navbar = ({ toggleSidebar, isRedAlert, onPageChange }) => {
//     const { language, setLanguage } = useLanguage();
//     const [simulationTimeline, setSimulationTimeline] = useState(() => localStorage.getItem('SIMULATION_TIMELINE') || 'live');
//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const handleSimulationChange = (e) => {
//         const val = e.target.value;
//         setSimulationTimeline(val);
//         localStorage.setItem('SIMULATION_TIMELINE', val);
//         window.location.reload();
//     };

//     return (
//         <nav className={`sticky top-0 z-[1000] w-full transition-all duration-300 font-['Outfit'] ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-slate-200/50' : 'bg-white border-b border-slate-100'} px-4 sm:px-6 h-[72px] flex items-center justify-between`}>
//             {/* Left: Logo & Mobile Menu */}
//             <div className="flex items-center gap-3 sm:gap-4">
//                 <button
//                     onClick={toggleSidebar}
//                     className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl md:hidden transition-all active:scale-95"
//                 >
//                     <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </button>
//                 <div className="transition-transform duration-300 hover:scale-105 origin-left">
//                     <Logo />
//                 </div>
//             </div>

//             {/* Right: Controls */}
//             <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">

//                 {/* Simulation Timeline Selector */}
//                 <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-sm hover:shadow-md ${simulationTimeline !== 'live'
//                     ? 'bg-red-50/80 border-red-200/60 hover:border-red-300 text-red-600'
//                     : 'bg-slate-50 border-slate-200/60 hover:border-slate-300 text-slate-600'
//                     }`}>
//                     <span className="text-sm sm:text-base">{simulationTimeline === 'live' ? '🌤️' : '⛈️'}</span>
//                     <div className="relative flex items-center">
//                         <select
//                             value={simulationTimeline}
//                             onChange={handleSimulationChange}
//                             className={`appearance-none bg-transparent border-none outline-none text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer pr-5 ${simulationTimeline !== 'live' ? 'text-red-600' : 'text-slate-600'
//                                 }`}
//                         >
//                             <option value="live">Live Data</option>
//                             <option value="escalating">Escalating (3 Days Ago)</option>
//                             <option value="critical">Critical Flood (7 Days Ago)</option>
//                         </select>
//                         <ChevronDown className={`absolute right-0 w-3.5 h-3.5 pointer-events-none ${simulationTimeline !== 'live' ? 'text-red-500' : 'text-slate-400'}`} />
//                     </div>
//                 </div>

//                 {/* System Online / CRITICAL Status */}
//                 {isRedAlert ? (
//                     <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-red-50/80 border border-red-200/60 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.15)] backdrop-blur-sm">
//                         <div className="relative flex items-center justify-center">
//                             <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75" />
//                             <div className="relative w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
//                         </div>
//                         <span className="text-xs font-black text-red-600 uppercase tracking-widest hidden lg:inline-block">CRITICAL</span>
//                     </div>
//                 ) : (
//                     <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50/80 border border-emerald-200/60 rounded-full shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
//                         <div className="relative flex items-center justify-center">
//                             <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-30" />
//                             <div className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
//                         </div>
//                         <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest hidden lg:inline-block">Online</span>
//                     </div>
//                 )}

//                 {/* Divider */}
//                 <div className="w-[1px] h-6 bg-slate-200/80 hidden sm:block" />

//                 {/* Language Selector */}
//                 <div className="relative group flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-all shadow-sm hover:shadow">
//                     <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
//                     <select
//                         value={language}
//                         onChange={(e) => setLanguage(e.target.value)}
//                         className="appearance-none bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-slate-600 cursor-pointer pr-4 hover:text-blue-600 transition-colors"
//                     >
//                         <option value="en">EN</option>
//                         <option value="hi">HI</option>
//                         <option value="mr">MR</option>
//                     </select>
//                     <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none group-hover:text-blue-500" />
//                 </div>

//                 {/* Notification Bell */}
//                 <button className="relative p-2 sm:p-2.5 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 group">
//                     <Bell className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors stroke-[2]" />
//                     <div className="absolute top-1.5 sm:top-2 right-2 sm:right-2.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 border-2 border-white shadow-sm ring-2 ring-red-500/20" />
//                 </button>

//                 {/* Divider */}
//                 <div className="w-[1px] h-6 bg-slate-200/80 hidden sm:block" />

//                 {/* Profile */}
//                 <div
//                     onClick={() => onPageChange && onPageChange('profile')}
//                     className="flex items-center gap-2 sm:gap-3 p-1.5 pr-2 sm:pr-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-200/60 cursor-pointer transition-all active:scale-95 group"
//                 >
//                     <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-blue-100/50 shadow-sm group-hover:shadow group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
//                         <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
//                     </div>
//                     <div className="hidden lg:flex flex-col">
//                         <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">Admin</span>
//                         <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Superuser</span>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Bell, Menu, ChevronDown, Globe } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ toggleSidebar, isRedAlert, onPageChange }) => {
    const { language, setLanguage } = useLanguage();
    const [simulationTimeline, setSimulationTimeline] = useState(() => localStorage.getItem('SIMULATION_TIMELINE') || 'live');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSimulationChange = (e) => {
        const val = e.target.value;
        setSimulationTimeline(val);
        localStorage.setItem('SIMULATION_TIMELINE', val);
        window.location.reload();
    };

    // Helper to determine the container styles based on simulation state
    const getSimulationStyles = () => {
        if (simulationTimeline === 'live') {
            return 'bg-slate-50 border-slate-200/60 hover:border-slate-300 text-slate-600';
        }
        if (simulationTimeline === 'critical') {
            return 'bg-red-600 border-red-700 text-white shadow-md';
        }
        // Default for 'escalating'
        return 'bg-red-50/80 border-red-200/60 hover:border-red-300 text-red-600';
    };

    return (
        <nav className={`sticky top-0 z-[1000] w-full transition-all duration-300 font-['Outfit'] ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-slate-200/50' : 'bg-white border-b border-slate-100'} px-4 sm:px-6 h-[72px] flex items-center justify-between`}>
            {/* Left: Logo & Mobile Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl md:hidden transition-all active:scale-95"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="transition-transform duration-300 hover:scale-105 origin-left">
                    <Logo />
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">

                {/* Simulation Timeline Selector */}
                <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${getSimulationStyles()}`}>
                    <span className="text-sm sm:text-base">{simulationTimeline === 'live' ? '🌤️' : '⛈️'}</span>
                    <div className="relative flex items-center">
                        <select
                            value={simulationTimeline}
                            onChange={handleSimulationChange}
                            className={`appearance-none bg-transparent border-none outline-none text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer pr-5 ${
                                simulationTimeline === 'critical' ? 'text-white' : (simulationTimeline === 'live' ? 'text-slate-600' : 'text-red-600')
                            }`}
                        >
                            <option value="live" className="text-slate-900">Live Data</option>
                            <option value="escalating" className="text-red-600">Escalating (3 Days Ago)</option>
                            <option value="critical" className="text-red-700 font-bold">Critical Flood (7 Days Ago)</option>
                        </select>
                        <ChevronDown className={`absolute right-0 w-3.5 h-3.5 pointer-events-none ${
                            simulationTimeline === 'critical' ? 'text-red-100' : (simulationTimeline === 'live' ? 'text-slate-400' : 'text-red-500')
                        }`} />
                    </div>
                </div>

                {/* System Online / CRITICAL Status */}
                {isRedAlert ? (
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-red-50/80 border border-red-200/60 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.15)] backdrop-blur-sm">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75" />
                            <div className="relative w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                        </div>
                        <span className="text-xs font-black text-red-600 uppercase tracking-widest hidden lg:inline-block">CRITICAL</span>
                    </div>
                ) : (
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50/80 border border-emerald-200/60 rounded-full shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-30" />
                            <div className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest hidden lg:inline-block">Online</span>
                    </div>
                )}

                {/* Divider */}
                <div className="w-[1px] h-6 bg-slate-200/80 hidden sm:block" />

                {/* Language Selector */}
                <div className="relative group flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-all shadow-sm hover:shadow">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="appearance-none bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-slate-600 cursor-pointer pr-4 hover:text-blue-600 transition-colors"
                    >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="mr">MR</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none group-hover:text-blue-500" />
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 sm:p-2.5 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 group">
                    <Bell className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition-colors stroke-[2]" />
                    <div className="absolute top-1.5 sm:top-2 right-2 sm:right-2.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 border-2 border-white shadow-sm ring-2 ring-red-500/20" />
                </button>

                {/* Divider */}
                <div className="w-[1px] h-6 bg-slate-200/80 hidden sm:block" />

                {/* Profile */}
                <div
                    onClick={() => onPageChange && onPageChange('profile')}
                    className="flex items-center gap-2 sm:gap-3 p-1.5 pr-2 sm:pr-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-200/60 cursor-pointer transition-all active:scale-95 group"
                >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-blue-100/50 shadow-sm group-hover:shadow group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">Admin</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Superuser</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;