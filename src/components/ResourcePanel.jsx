import { useLanguage } from '../context/LanguageContext';
import { Bus, Anchor, Truck } from 'lucide-react';
import { useFirebaseSync } from '../hooks/useFirebaseSync';

const ResourcePanel = () => {
    const { t } = useLanguage();
    const { resources: fbResources } = useFirebaseSync();

    const resources = [
        { label: t('resource.buses'), count: fbResources?.buses?.active || 42, icon: Bus, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: t('resource.boats'), count: fbResources?.boats?.active || 15, icon: Anchor, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        { label: t('resource.ambulances'), count: fbResources?.ambulances?.active || 28, icon: Truck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="p-4 border-b border-slate-50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Resources Available</p>
            <div className="space-y-3">
                {resources.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${r.bg} ${r.color}`}>
                                <r.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-slate-600">{r.label}</span>
                        </div>
                        <span className="text-base font-bold text-slate-900">{r.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcePanel;
