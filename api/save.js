import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {
        const { status } = req.body;
        await supabase.from('study_logs').insert([{ status }]);
        return res.status(200).json({ success: true });
    }
    res.status(405).send("Method Not Allowed");
}