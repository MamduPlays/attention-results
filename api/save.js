async function sendToCloud(statusText, timeNow) {
    // 1. Send to Google Sheets (Original Logic)
    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // Google needs no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: timeNow, status: statusText })
    }).catch(err => console.log("Google Sheets Error:", err));

    // 2. Send to Vercel (Updated Logic)
    fetch(VERCEL_API_URL, {
        method: 'POST',
        // Note: NO 'mode: no-cors' here. Vercel needs to see the headers.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: timeNow, status: statusText })
    })
    .then(response => {
        if (!response.ok) throw new Error('Vercel response was not ok');
        console.log("Vercel Success:", statusText);
    })
    .catch(err => console.log("Vercel Cloud Error:", err));
}