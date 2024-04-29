const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
require('dotenv').config({ path: '/home/sheetGrabber.env' });
const punycode = require('punycode/');

const app = express();
const PORT = process.env.PORT || 3987;

// Middleware to parse JSON
app.use(bodyParser.json());

function verifyApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Invalid or missing API key' });
    }
    next();
}


app.get('/', (req, res) => {
    res.send('Sheet Grabber is running...');
});

// Protected route
app.post('/sheet', verifyApiKey, async (req, res) => {
    try {
        const spreadsheetId = req.body.spreadsheetId; // Expecting spreadsheetId from the body
        const sheetName = req.body.sheetName; // Expecting just the sheet name from the body
        const sheetData = await getSheetData(spreadsheetId, `${sheetName}!A1:AK5000`); // Automatically extending range to cover many rows and columns
        res.json(sheetData);
    } catch (error) {
        res.status(500).json({ message: "Error processing sheet", error: error.message });
    }
});


async function getSheetData(spreadsheetId, range) {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    try {
        const response = await googleSheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        return response.data.values;
    } catch (error) {
        console.error('Detailed error information:', error);
        throw error;
    }
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
