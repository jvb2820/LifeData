import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
} from 'recharts';

interface CountryData {
    country: string;
    users: number;
    flag: string;
}

const COUNTRY_TABS = [
    { id: 'dashboard', label: 'Philippines', flag: '🇵🇭' },
    { id: 'analytics', label: 'Fiji', flag: '🇫🇯' },
    { id: 'users', label: 'Nigeria', flag: '🇳🇬' },
    { id: 'drc', label: 'DRC', flag: '🇨🇩' },
    { id: 'ghana', label: 'Ghana', flag: '🇬🇭' },
    { id: 'madagascar', label: 'Madagascar', flag: '🇲🇬' },
    { id: 'malawi', label: 'Malawi', flag: '🇲🇼' },
    { id: 'southafrica', label: 'South Africa', flag: '🇿🇦' },
    { id: 'tonga', label: 'Tonga', flag: '🇹🇴' },
    { id: 'uganda', label: 'Uganda', flag: '🇺🇬' },
    { id: 'p100', label: 'P100', flag: '🏅' },
    { id: 'roc', label: 'R. Congo', flag: '🇨🇬' },
];

const BAR_COLORS = [
    '#059669', '#0d9488', '#0891b2', '#0284c7', '#4f46e5',
    '#7c3aed', '#c026d3', '#e11d48', '#ea580c', '#d97706',
    '#65a30d', '#16a34a',
];

export default function OverviewContent() {
    const [data, setData] = useState<CountryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        async function fetchAllCountries() {
            setLoading(true);
            setError(null);
            try {
                const results = await Promise.all(
                    COUNTRY_TABS.map(async (tab) => {
                        try {
                            const { data, error } = await supabase.functions.invoke('get-masterlist', {
                                method: 'POST',
                                body: { country: tab.id },
                            });
                            if (error) return { country: tab.label, users: 0, flag: tab.flag };
                            const users = data?.users || [];
                            return { country: tab.label, users: users.length, flag: tab.flag };
                        } catch {
                            return { country: tab.label, users: 0, flag: tab.flag };
                        }
                    })
                );

                const sorted = results.sort((a, b) => b.users - a.users);
                setData(sorted);
                setTotalUsers(sorted.reduce((sum, c) => sum + c.users, 0));
            } catch (e: unknown) {
                setError(e instanceof Error ? e.message : 'Failed to fetch overview data');
            } finally {
                setLoading(false);
            }
        }

        fetchAllCountries();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading overview data…</p>
                    <p className="text-gray-400 text-sm mt-1">Fetching data from all countries</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="glass-card rounded-2xl p-8 text-center max-w-md">
                    <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load data</h3>
                    <p className="text-gray-500 text-sm mb-4">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto space-y-6 pb-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-y-6 translate-x-6" />
                    <div className="relative">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Users</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                            {totalUsers.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Across all countries</p>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -translate-y-6 translate-x-6" />
                    <div className="relative">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Countries</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                            {data.filter(d => d.users > 0).length}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Active regions</p>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-6 translate-x-6" />
                    <div className="relative">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Average per Country</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                            {data.filter(d => d.users > 0).length > 0
                                ? Math.round(totalUsers / data.filter(d => d.users > 0).length).toLocaleString()
                                : '0'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Users per country</p>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Total Users by Country</h3>
                        <p className="text-sm text-gray-400 mt-0.5">Overview of all registered users across all countries</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        {data.length} Countries
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={420}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                    >
                        <defs>
                            {BAR_COLORS.map((color, i) => (
                                <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis
                            dataKey="country"
                            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                            axisLine={{ stroke: '#d1d5db' }}
                            tickLine={false}
                            interval={0}
                            angle={-25}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(255,255,255,0.97)',
                                borderRadius: 14,
                                border: 'none',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                padding: '12px 16px',
                            }}
                            labelStyle={{ fontWeight: 700, color: '#1f2937', fontSize: 14 }}
                            formatter={(value: number | string | undefined) => [`${Number(value ?? 0).toLocaleString()} users`, 'Total']}
                            cursor={{ fill: 'rgba(16, 185, 129, 0.06)' }}
                        />
                        <Bar
                            dataKey="users"
                            name="Users"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={56}
                        >
                            <LabelList
                                dataKey="users"
                                position="top"
                                style={{ fontSize: 11, fontWeight: 600, fill: '#374151' }}
                                formatter={(value: any) => Number(value ?? 0).toLocaleString()}
                            />
                            {data.map((_entry, index) => (
                                <Cell
                                    key={index}
                                    fill={`url(#barGrad${index % BAR_COLORS.length})`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Country Breakdown Table */}
            <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Country Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.map((item, index) => (
                        <div
                            key={item.country}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/60 hover:bg-white/90 border border-gray-100 hover:border-emerald-200 transition-all duration-200 hover:shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-gray-300 w-6">
                                    {index + 1}
                                </span>
                                <span className="text-xl">{item.flag}</span>
                                <span className="text-sm font-semibold text-gray-700">{item.country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-800">{item.users.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-400 font-medium">users</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
