const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { addNote, loadNotes, updateNote, deleteNote } = require("./notes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/add-notes", (req, res) => {
  if (!req.body || !req.body.note) {
    return res.status(400).send("Note content is required");
  }
  addNote(req.body.note);
  return res.redirect("/");
});

app.post("/update-note/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  if (!req.body || !req.body.newContent) {
    return res.status(400).send("New content is required");
  }

  updateNote(noteId, req.body.newContent);
  return res.redirect("/");
});

app.post("/delete-note/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  deleteNote(noteId);
  return res.redirect("/");
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
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
                    <h2>Your Notes:</h2>
                    <form action="/" method="GET">
                        <input type="text" name="filter" placeholder="Filter notes">
                        <input type="submit" value="Filter">
                    </form>
                    <ul>
                        ${loadNotes(req.query.filter)
                            .map(
                            (note) =>
                            `<li><span>${note.note}</span>
                            <form action="/update-note/${note.id}" method="POST" style="display:inline;">
                                <input type="text" name="newContent" placeholder="New content" required>
                                <input type="submit" value="Edit">
                            </form>
                            <form action="/delete-note/${note.id}" method="POST" style="display:inline;">
                                <input type="submit" value="Delete">
                            </form>
                            </li>`
                            )
                        .join("")}
                    </ul>
                </div>
            </body>
            </html>
        `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
