import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StatusChartProps {
    data: Record<string, number>;
}

const COLORS: Record<string, string> = {
    Active: '#10b981',
    Inactive: '#f43f5e',
    Unknown: '#94a3b8',
};

const DEFAULT_COLORS = ['#6366f1', '#f59e0b', '#06b6d4'];

export default function StatusChart({ data }: StatusChartProps) {
    const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

    if (chartData.length === 0) {
        return (
            <div className="glass-card rounded-2xl p-6 flex items-center justify-center h-64">
                <p className="text-gray-400 text-sm">No data available</p>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-700 mb-4">Active vs Inactive</h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" iconSize={10} formatter={(value) => <span style={{ color: '#374151', fontSize: 12 }}>{value}</span>} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
