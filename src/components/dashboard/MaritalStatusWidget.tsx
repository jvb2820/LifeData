import React from 'react';

interface MaritalStatusWidgetProps {
    data: Record<string, number>;
}

const COLORS: Record<string, string> = {
    'Single': '#3b82f6',     // blue
    'Married': '#10b981',    // emerald
    'Widowed': '#8b5cf6',    // purple
    'Divorced': '#f59e0b',   // amber
    'Annulled': '#ec4899',   // pink
    'Separated': '#f43f5e',  // rose
    'Unknown': '#94a3b8'     // slate
};
const DEFAULT_COLOR = '#64748b';

export default function MaritalStatusWidget({ data }: MaritalStatusWidgetProps) {
    const sortedData = Object.entries(data)
        .filter(([status]) => status.toLowerCase() !== 'unknown' && status.trim() !== '')
        .sort((a, b) => b[1] - a[1]);

    if (sortedData.length === 0) return null;

    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-center h-full lg:col-span-3">
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Marital Status Breakdown</h3>
            <div className="flex flex-wrap items-center gap-3">
                {sortedData.map(([status, count]) => (
                    <div
                        key={status}
                        className="flex items-center gap-2 bg-white/60 hover:bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm transition-colors"
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: COLORS[status] || DEFAULT_COLOR }}
                        />
                        <span className="text-sm font-semibold text-gray-600">{status}</span>
                        <span className="text-sm font-extrabold ml-1" style={{ color: COLORS[status] || DEFAULT_COLOR }}>
                            {count.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
