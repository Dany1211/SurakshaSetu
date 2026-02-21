import { useLanguage } from '../context/LanguageContext';

const ResourceCard = ({ label, count, colorClass }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{count}</p>
    </div>
);

const ResourcePanel = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <h2 className="text-lg font-bold text-gray-800 mb-5">{t('resource.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ResourceCard
                    label={t('resource.buses')}
                    count="42"
                    colorClass="text-blue-600"
                />
                <ResourceCard
                    label={t('resource.boats')}
                    count="15"
                    colorClass="text-blue-600"
                />
                <ResourceCard
                    label={t('resource.ambulances')}
                    count="28"
                    colorClass="text-blue-600"
                />
            </div>
        </div>
    );
};

export default ResourcePanel;
