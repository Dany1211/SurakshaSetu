import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
                <span className="text-xl font-bold text-blue-800 tracking-tight">
                    {t('app.title')}
                </span>
            </div>
            <div className="flex items-center space-x-6">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 outline-none"
                >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="mr">मराठी</option>
                </select>
                <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
                        A
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                        {t('nav.profile')}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
