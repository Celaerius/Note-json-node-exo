const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

import { addNote, loadNotes } from './notes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/add-notes', (req, res) => {
    if (!req.body || !req.body.note) {
        return res.status(400).send('Note content is required');
    }
    addNote(req.body.note);
    return res.redirect('/');
});

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Note</title>
            </head>
            <body>
                <form action="/add-notes" method="POST">
                    <label for="note">Enter your note:</label><br>
                    <textarea id="note" name="note" rows="10" cols="30"></textarea><br>
                    <input type="submit" value="Submit">
                </form>
                <div id="NoteList">
                    <!-- Notes will be displayed here -->
                </div>
            </body>
            </html>
        `);
    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});