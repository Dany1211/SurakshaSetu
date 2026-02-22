import RiskCard from '../components/RiskCard';
import PlanPanel from '../components/PlanPanel';
import FloodMap from '../components/FloodMap';
import SOSPanel from '../components/SOSPanel';
import ResourcePanel from '../components/ResourcePanel';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const mockWards = [
        { id: 1, name: 'Andheri West', rainfall: 145, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 2, name: 'Dadar', rainfall: 85, riverLevel: 2.1, riskLevel: 'MEDIUM' },
        { id: 3, name: 'Borivali', rainfall: 40, riverLevel: 1.5, riskLevel: 'LOW' },
        { id: 4, name: 'Kurla', rainfall: 160, riverLevel: 3.2, riskLevel: 'HIGH' },
        { id: 5, name: 'Bandra', rainfall: 110, riverLevel: 2.8, riskLevel: 'MEDIUM' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 h-full max-w-[1800px] mx-auto flex gap-6 overflow-hidden"
            style={{ fontFamily: 'Outfit, sans-serif' }}
        >
            {/* Left: Map + Plan — Flexible Main Area */}
            <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-y-auto no-scrollbar pb-6">

                {/* Flood Map Glass Container */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex-shrink-0 group transition-all">
                    <div className="h-[420px] relative">
                        <FloodMap />
                    </div>
                </div>

                {/* AI Evacuation Plan Panel */}
                <div className="flex-shrink-0">
                    <PlanPanel />
                </div>
            </div>

            {/* Right: Operational Sidebar — Fixed Width */}
            <div className="w-[380px] flex-shrink-0 hidden xl:flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">

                {/* SOS Alerts Section */}
                <SOSPanel />

                {/* Resource Allocation View */}
                <ResourcePanel />

                {/* Ward Monitoring Section */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 py-5 flex items-center justify-between border-b border-slate-50">
                        <div>
                            <h2 className="text-[14px] font-black text-slate-900 tracking-[0.1em] uppercase">
                                Ward Telemetry
                            </h2>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Live Zone Monitoring</p>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-red-50 rounded-lg border border-red-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                            <span className="text-[10px] font-black text-red-600 tracking-widest uppercase">Live</span>
                        </div>
                    </div>

                    {/* Ward Cards Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="space-y-4 pb-4">
                            {mockWards.map((ward, idx) => (
                                <motion.div
                                    key={ward.id}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <RiskCard
                                        wardName={ward.name}
                                        rainfall={ward.rainfall}
                                        riverLevel={ward.riverLevel}
                                        riskLevel={ward.riskLevel}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
