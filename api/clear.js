import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).send("Method Not Allowed");
    await supabase.from('study_logs').delete().neq('id', 0);
    res.status(200).json({ success: true });
}