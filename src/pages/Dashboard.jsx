import { useLanguage } from '../context/LanguageContext';
import RiskCard from '../components/RiskCard';
import ResourcePanel from '../components/ResourcePanel';
import PlanPanel from '../components/PlanPanel';

const Dashboard = () => {
    const { t } = useLanguage();

    const mockWards = [
        { id: 1, name: 'Andheri West', rainfall: 145, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 2, name: 'Dadar', rainfall: 85, riverLevel: 2.1, riskLevel: 'MEDIUM' },
        { id: 3, name: 'Borivali', rainfall: 40, riverLevel: 1.5, riskLevel: 'LOW' },
        { id: 4, name: 'Kurla', rainfall: 160, riverLevel: 3.8, riskLevel: 'HIGH' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Top row: Map and Wards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Heatmap Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px] flex flex-col">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">{t('map.title')}</h2>
                    <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 font-medium">Map Integration Placeholder</p>
                    </div>
                </div>

                {/* Wards Grid */}
                <div className="lg:col-span-1 flex flex-col space-y-4 overflow-y-auto max-h-[400px] pr-1">
                    {mockWards.map((ward) => (
                        <RiskCard
                            key={ward.id}
                            wardName={ward.name}
                            rainfall={ward.rainfall}
                            riverLevel={ward.riverLevel}
                            riskLevel={ward.riskLevel}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom row: Resources and Evacuation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResourcePanel />
                <PlanPanel />
            </div>
        </div>
    );
};

export default Dashboard;
