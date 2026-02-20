import type { Filters } from '../../types';

interface FilterBarProps {
    filters: Filters;
    countries: string[];
    genders: string[];
    statuses: string[];
    onFilterChange: (key: keyof Filters, value: string) => void;
    onReset: () => void;
    totalFiltered: number;
    totalAll: number;
}

export default function FilterBar({
    filters,
    countries,
    genders,
    statuses,
    onFilterChange,
    onReset,
    totalFiltered,
    totalAll,
}: FilterBarProps) {
    const hasActiveFilters = filters.country || filters.gender || filters.status;

    return (
        <div className="glass-card rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                Showing <span className="font-bold text-gray-800">{totalFiltered}</span> of{' '}
                <span className="font-bold text-gray-800">{totalAll}</span> records
            </span>

            <div className="flex flex-wrap gap-3 flex-1">
                {/* Country */}
                <select
                    value={filters.country}
                    onChange={(e) => onFilterChange('country', e.target.value)}
                    className="select-glass text-sm"
                >
                    <option value="">All Countries</option>
                    {countries.sort().map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                {/* Gender */}
                <select
                    value={filters.gender}
                    onChange={(e) => onFilterChange('gender', e.target.value)}
                    className="select-glass text-sm"
                >
                    <option value="">All Genders</option>
                    {genders.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                {/* Status */}
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="select-glass text-sm"
                >
                    <option value="">All Statuses</option>
                    {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {hasActiveFilters && (
                <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-rose-500 bg-rose-50 hover:bg-rose-100 font-medium transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Filters
                </button>
            )}
        </div>
    );
}
