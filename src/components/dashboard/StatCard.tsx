interface StatCardProps {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    color: 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';
    suffix?: string;
}

const colorMap = {
    indigo: {
        icon: 'bg-indigo-100 text-indigo-600',
        badge: 'bg-indigo-500',
        ring: 'ring-indigo-100',
        value: 'text-indigo-600',
    },
    emerald: {
        icon: 'bg-emerald-100 text-emerald-600',
        badge: 'bg-emerald-500',
        ring: 'ring-emerald-100',
        value: 'text-emerald-600',
    },
    violet: {
        icon: 'bg-violet-100 text-violet-600',
        badge: 'bg-violet-500',
        ring: 'ring-violet-100',
        value: 'text-violet-600',
    },
    amber: {
        icon: 'bg-amber-100 text-amber-600',
        badge: 'bg-amber-500',
        ring: 'ring-amber-100',
        value: 'text-amber-600',
    },
    rose: {
        icon: 'bg-rose-100 text-rose-600',
        badge: 'bg-rose-500',
        ring: 'ring-rose-100',
        value: 'text-rose-600',
    },
};

export default function StatCard({ label, value, icon, color, suffix }: StatCardProps) {
    const c = colorMap[color];
    return (
        <div className={`glass-card rounded-2xl p-6 ring-2 ${c.ring} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center`}>
                    {icon}
                </div>
                <div className={`w-2 h-2 rounded-full ${c.badge} mt-1`} />
            </div>
            <div className="mt-4">
                <p className={`text-3xl font-extrabold ${c.value} leading-tight`}>
                    {value}
                    {suffix && <span className="text-base font-semibold ml-1">{suffix}</span>}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
            </div>
        </div>
    );
}
