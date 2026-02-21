import { useLanguage } from '../context/LanguageContext';
import { Droplets, Waves, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskCard = ({ wardName, rainfall, riverLevel, riskLevel }) => {
    const { t } = useLanguage();

    const getRiskStyles = (level) => {
        switch (level) {
            case 'LOW': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'MEDIUM': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'HIGH': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    return (
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm transition-all hover:border-suraksha-200 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-[11px] font-bold text-slate-700 tracking-tight group-hover:text-suraksha-600 transition-colors uppercase">
                    {wardName}
                </h3>
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border uppercase tracking-tighter ${getRiskStyles(riskLevel)}`}>
                    {riskLevel}
                </span>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-3 pb-1">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                            <Droplets className="w-2.5 h-2.5" /> RAIN
                        </span>
                        <span className="text-xs font-bold text-slate-900">{rainfall}mm</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                            <Waves className="w-2.5 h-2.5" /> RIVER
                        </span>
                        <span className="text-xs font-bold text-slate-900">{riverLevel}m</span>
                    </div>
                </div>

                <div className="w-full bg-slate-50 rounded-full h-1 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((rainfall / 200) * 100, 100)}%` }}
                        className={`h-full rounded-full transition-colors ${riskLevel === 'HIGH' ? 'bg-red-500' : 'bg-suraksha-500'}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default RiskCard;
