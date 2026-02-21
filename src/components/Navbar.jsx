import { useLanguage } from '../context/LanguageContext';
import { Globe, User, Bell, Menu } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ toggleSidebar }) => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-white border-b border-slate-100 px-4 sm:px-6 py-2 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 text-slate-500 hover:text-suraksha-600 hover:bg-suraksha-50 rounded-lg md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <Logo />
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg px-2 py-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent text-slate-600 text-xs font-semibold outline-none cursor-pointer"
                    >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="mr">MR</option>
                    </select>
                </div>

                <div className="h-6 w-px bg-slate-100 hidden sm:block" />

                <div className="flex items-center gap-3">
                    <button className="p-1.5 text-slate-400 hover:text-suraksha-600 transition-colors">
                        <Bell className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-slate-50 rounded-lg transition-all">
                        <div className="w-7 h-7 rounded-lg bg-suraksha-50 flex items-center justify-center text-suraksha-600 shadow-sm border border-suraksha-100">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="hidden lg:block text-xs font-bold text-slate-700">Admin</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
