import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface JoinedTrendChartProps {
    data: { month: string; count: number }[];
}

export default function JoinedTrendChart({ data }: JoinedTrendChartProps) {
    if (data.length === 0) {
        return (
            <div className="glass-card rounded-2xl p-6 flex items-center justify-center h-64">
                <p className="text-gray-400 text-sm">No join trend data available</p>
            </div>
        );
    }

    // Format month labels: "2024-03" → "Mar '24"
    const formattedData = data.map(({ month, count }) => {
        const [year, m] = month.split('-');
        const label = new Date(Number(year), Number(m) - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        return { month: label, count };
    });

    return (
        <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-700 mb-4">Monthly Join Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={formattedData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 600, color: '#374151' }}
                    />
                    <Area type="monotone" dataKey="count" name="New Members" stroke="#6366f1" strokeWidth={2.5} fill="url(#trendGrad)" dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
