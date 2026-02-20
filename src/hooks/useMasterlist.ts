import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Analytics, Filters } from '../types';

const DEFAULT_FILTERS: Filters = { search: '', country: '', gender: '', status: '' };

export function useMasterlist() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: err } = await supabase.functions.invoke('get-masterlist', {
                method: 'GET'
            });
            if (err) throw err;
            setAnalytics({
                total: data.total_users,
                byAffiliation: data.affiliation_counts,
                // stub out other required fields for now
                active: 0,
                inactive: 0,
                byCountry: {},
                byGender: {},
                byStatus: {},
                joinedByMonth: []
            });
            setLastUpdated(new Date());
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const updateFilter = (key: keyof Filters, value: string) => { };
    const resetFilters = () => { };

    return {
        allData: [],
        filteredData: [],
        analytics,
        filters: DEFAULT_FILTERS,
        loading,
        error,
        lastUpdated,
        fetchData,
        updateFilter,
        resetFilters,
        countries: [],
        genders: [],
        statuses: [],
    };
}
