import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Support for deleting specific IDs or EVERYTHING
    if (req.method === 'DELETE' || req.method === 'POST') {
        const { ids, all } = req.body;

        if (all === true) {
            // Delete Everything
            await supabase.from('study_logs').delete().neq('id', 0);
            return res.status(200).json({ success: true, message: "All cleared" });
        } else if (ids && ids.length > 0) {
            // Delete Specific IDs
            const { error } = await supabase.from('study_logs').delete().in('id', ids);
            if (error) return res.status(500).json(error);
            return res.status(200).json({ success: true, deleted: ids.length });
        }
    }

    res.status(405).send("Method Not Allowed");
}