import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY)

export default async function handler(req, res) {
    // ALLOW EVERYTHING FOR CHROME EXTENSIONS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { time, status } = req.body;

            if (!status) {
                return res.status(400).json({ error: "Status is missing" });
            }

            const { data, error } = await supabase
                .from('study_logs')
                .insert([{ 
                    time_label: time || new Date().toLocaleTimeString(), 
                    status: status 
                }]);

            if (error) throw error;

            return res.status(200).json({ success: true, message: "Logged to Supabase" });
        } catch (err) {
            console.error("Server Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
    }

    res.status(405).json({ message: "Use POST" });
}