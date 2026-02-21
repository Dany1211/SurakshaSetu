import { useLanguage } from '../context/LanguageContext';

const PlanPanel = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-800 mb-5">{t('plan.title')}</h2>

            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">{t('plan.order')}</span>
                    <span className="text-sm font-medium text-gray-900">Ward A, Ward C</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">{t('plan.shelters')}</span>
                    <span className="text-sm font-medium text-gray-900">Primary School 1, Town Hall</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">{t('plan.summary')}</span>
                    <span className="text-sm font-medium text-gray-900">12 Buses, 4 Boats</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                    <span className="text-sm text-gray-600">{t('plan.time')}</span>
                    <span className="text-sm font-medium text-gray-900">45 mins</span>
                </div>
            </div>

            <button
                type="button"
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {t('plan.button')}
            </button>
        </div>
    );
};

export default PlanPanel;
