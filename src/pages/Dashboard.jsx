import { useLanguage } from '../context/LanguageContext';
import RiskCard from '../components/RiskCard';
import ResourcePanel from '../components/ResourcePanel';
import PlanPanel from '../components/PlanPanel';
import FloodMap from '../components/FloodMap';
import { Layers, Filter } from 'lucide-react';

const Dashboard = () => {
    const { t } = useLanguage();

    const mockWards = [
        { id: 1, name: 'Andheri West', rainfall: 145, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 2, name: 'Dadar', rainfall: 85, riverLevel: 2.1, riskLevel: 'MEDIUM' },
        { id: 3, name: 'Borivali', rainfall: 40, riverLevel: 1.5, riskLevel: 'LOW' },
        { id: 4, name: 'Kurla', rainfall: 160, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 5, name: 'Bandra', rainfall: 110, riverLevel: 2.8, riskLevel: 'MEDIUM' },
    ];

    return (
        <div className="p-4 sm:p-5 h-full max-w-[1600px] mx-auto overflow-hidden flex flex-col xl:flex-row gap-5">
            {/* Left: Main Operations Area */}
            <div className="flex-1 flex flex-col min-w-0 gap-5 overflow-y-auto custom-scrollbar">
                {/* Live Flood Map */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative shrink-0">
                    <div className="absolute top-4 left-4 z-[1000] flex gap-2">
                        <button className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm flex items-center gap-1.5 hover:bg-white transition-all">
                            <Layers className="w-3 h-3 text-suraksha-600" />
                            ZONES
                        </button>
                        <button className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm flex items-center gap-1.5 hover:bg-white transition-all">
                            <Filter className="w-3 h-3 text-slate-400" />
                            FILTERS
                        </button>
                    </div>

                    <div className="h-[380px]">
                        <FloodMap />
                    </div>
                </div>

                {/* AI Evacuation Plan — Full Width Priority */}
                <div className="shrink-0">
                    <PlanPanel />
                </div>
            </div>

            {/* Right: Sidebar — Resources + Ward Monitoring */}
            <div className="w-full xl:w-72 shrink-0 h-full">
                <div className="bg-white rounded-2xl border border-slate-100 h-full shadow-sm flex flex-col overflow-hidden">
                    {/* Resources */}
                    <ResourcePanel />

                    {/* Ward Monitoring Header */}
                    <div className="px-4 pt-3 pb-2 flex items-center justify-between">
                        <div>
                            <h2 className="text-xs font-bold text-slate-900 tracking-tight uppercase">Ward Monitoring</h2>
                            <p className="text-[10px] text-slate-400 mt-0.5">Live Updates</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 rounded-md">
                            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-bold text-red-600">LIVE</span>
                        </div>
                    </div>

                    {/* Ward Cards */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
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
            </div>
        </div>
    );
};

export default Dashboard;

