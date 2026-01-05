const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'attendance.json');

app.use(cors());
app.use(express.json());

// Save attendance entry
app.post('/attendance', (req, res) => {
    const { name, shift, note } = req.body;
    const entry = {
        name,
        shift,
        note,
        date: new Date().toISOString()
    };
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE));
    }
    data.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// Get all attendance entries
app.get('/attendance', (req, res) => {
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE));
    }
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Attendance backend running on http://localhost:${PORT}`);
});
