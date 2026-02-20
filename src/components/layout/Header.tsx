interface HeaderProps {
    title: string;
    subtitle?: string;
    lastUpdated: Date | null;
    onRefresh: () => void;
    loading: boolean;
    search: string;
    onSearchChange: (val: string) => void;
}

export default function Header({
    title,
    subtitle,
    lastUpdated,
    onRefresh,
    loading,
    search,
    onSearchChange,
}: HeaderProps) {
    const formatTime = (date: Date) =>
        date.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

    return (
        <header className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4 mb-6">
            {/* Title */}
            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>

            {/* Search */}
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search name or email…"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-white/60 bg-white/50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-52 transition"
                />
            </div>

            {/* Last updated */}
            {lastUpdated && (
                <span className="text-xs text-gray-400 whitespace-nowrap">
                    Updated {formatTime(lastUpdated)}
                </span>
            )}

            {/* Refresh */}
            <button
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:scale-100"
            >
                <svg
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
            </button>
        </header>
    );
}
