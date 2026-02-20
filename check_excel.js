import { createClient } from '@supabase/supabase-js';
import * as xlsx from 'xlsx';
import fs from 'fs';

const SUPABASE_URL = 'https://uapwmxthjujlheiqhcpd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcHdteHRoanVqbGhlaXFoY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTcyNzIsImV4cCI6MjA4NzEzMzI3Mn0.Cm_sP-c4zLVyRxq9hnVD5vsosDUFC7VK2hnOOfUBsOs';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.storage
        .from('Data')
        .download('Lifewood x BYU Philippines Masterlist (2025-2026).xlsx');

    if (error) {
        console.error('Error downloading file:', error);
        return;
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets['Masterlist'];

    if (!worksheet) {
        console.log('Masterlist sheet not found');
        return;
    }

    const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    fs.writeFileSync('masterlist_data.json', JSON.stringify(json.slice(0, 10), null, 2));
    console.log('Saved first 10 rows of Masterlist to masterlist_data.json');
}

check();
