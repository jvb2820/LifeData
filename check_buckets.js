import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uapwmxthjujlheiqhcpd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcHdteHRoanVqbGhlaXFoY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTcyNzIsImV4cCI6MjA4NzEzMzI3Mn0.Cm_sP-c4zLVyRxq9hnVD5vsosDUFC7VK2hnOOfUBsOs';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
        console.error('Error fetching buckets:', bucketError);
        return;
    }
    console.log('Buckets:', buckets.map(b => b.name));

    for (const bucket of buckets) {
        console.log(`\nFiles in bucket "${bucket.name}":`);
        const { data: files, error: fileError } = await supabase.storage.from(bucket.name).list();
        if (fileError) {
            console.error(`Error fetching files for ${bucket.name}:`, fileError);
        } else {
            console.log(files.map(f => f.name));
        }
    }
}

check();
