const http = require('http');
const app = require('express')();
const PORT = process.env.PORT || 3000;

app.post('/add-notes', (req, res) => {
    if (!req.body || !req.body.note) {
        return res.status(400).send('Note content is required');
    }

    const notesModule = require('./notes');
    notesModule.addNote(req.body.note);
    return res.redirect('/');
});

const server = http.createServer(app);
server.on('request', (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
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
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});