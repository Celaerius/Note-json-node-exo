
class NoteView {

    renderIndex(notes) {
        const notesHtml = notes.map(note => `
            <li>
                <span>${this.escapeHtml(note.note)}</span>
                <form action="/update-note/${note.id}" method="POST" style="display:inline;">
                    <input type="text" name="newContent" placeholder="New content" required>
                    <input type="submit" value="Edit">
                </form>
                <form action="/delete-note/${note.id}" method="POST" style="display:inline;">
                    <input type="submit" value="Delete">
                </form>
                ${
                    note.isActive ? '<strong>(Pas Terminé)</strong>' : '<em>(Terminé)</em>'
                }
                <form action="/toggle-active/${note.id}" method="POST" style="display:inline;">
                    <input type="submit" value="${note.isActive ? 'Deactivate' : 'Activate'}">
                </form>
            </li>
        `).join('');

        return `
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
                    <h2>Your To-Do List:</h2>
                    <ul>
                        ${notesHtml}
                    </ul>
                </div>
            </body>
            </html>
        `;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

module.exports = new NoteView();
