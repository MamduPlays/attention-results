import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    // 1. THIS IS THE KEY PART: Allow any device/origin to send data
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle the pre-flight request from Chrome
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { time, status } = req.body;
        const { error } = await supabase.from('study_logs').insert([{ time_label: time, status: status }]);
        
        if (error) return res.status(500).json(error);
        return res.status(200).json({ success: true });
    }
}