import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {
        const { time, status } = req.body; // Catches the 'time' now
        await supabase.from('study_logs').insert([{ time_label: time, status: status }]);
        return res.status(200).json({ success: true });
    }
    res.status(405).send("Method Not Allowed");
}