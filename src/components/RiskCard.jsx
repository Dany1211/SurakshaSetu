import { useLanguage } from '../context/LanguageContext';

const RiskCard = ({ wardName, rainfall, riverLevel, riskLevel }) => {
    const { t } = useLanguage();

    const getRiskStyles = (level) => {
        switch (level) {
            case 'LOW':
                return 'bg-green-100 text-green-700';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-700';
            case 'HIGH':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getRiskLabel = (level) => {
        switch (level) {
            case 'LOW':
                return t('risk.low');
            case 'MEDIUM':
                return t('risk.medium');
            case 'HIGH':
                return t('risk.high');
            default:
                return level;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{wardName}</h3>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getRiskStyles(
                        riskLevel
                    )}`}
                >
                    {getRiskLabel(riskLevel)}
                </span>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('ward.rainfall')}</span>
                    <span className="font-medium text-gray-900">{rainfall}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min((rainfall / 200) * 100, 100)}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t('ward.river_level')}</span>
                    <span className="font-medium text-gray-900">{riverLevel}</span>
                </div>
            </div>
        </div>
    );
};

export default RiskCard;
