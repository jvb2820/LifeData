import type { MasterlistEntry } from '../../types';

interface PeopleNamesTableProps {
    data: MasterlistEntry[];
}

export default function PeopleNamesTable({ data }: PeopleNamesTableProps) {
    return (
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col" style={{ maxHeight: '420px' }}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-700">People</h3>
                </div>
                <span className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {data.length} members
                </span>
            </div>

            {/* Scrollable table body */}
            <div className="overflow-y-auto flex-1">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-white/60 backdrop-blur-sm border-b border-white/40">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">#</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-4 py-12 text-center text-gray-400 text-sm">
                                    No people found
                                </td>
                            </tr>
                        ) : (
                            data.map((entry, idx) => {
                                const fullName = [entry.first_name, entry.last_name].filter(Boolean).join(' ') || '—';
                                const initials = (entry.first_name?.[0] || '?').toUpperCase();
                                const status = (entry.active_status || '').toLowerCase();
                                const isActive = status === 'active';

                                return (
                                    <tr
                                        key={entry.id}
                                        className={`border-b border-white/30 hover:bg-indigo-50/40 transition-colors ${idx % 2 === 0 ? '' : 'bg-white/10'}`}
                                    >
                                        <td className="px-4 py-3 text-gray-400 text-xs font-mono">{idx + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                    {initials}
                                                </div>
                                                <span className="font-medium text-gray-800">{fullName}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                isActive
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                                {entry.active_status || 'Unknown'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
