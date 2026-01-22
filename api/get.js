import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { filter } = req.query;
    let query = supabase.from('study_logs').select('*');

    const now = new Date();
    if (filter === 'day') query = query.gte('created_at', new Date(now - 86400000).toISOString());
    if (filter === 'week') query = query.gte('created_at', new Date(now - 604800000).toISOString());
    if (filter === 'month') query = query.gte('created_at', new Date(now - 2592000000).toISOString());

    const { data } = await query.order('id', { ascending: false });
    res.status(200).json(data);
}