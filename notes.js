const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

function addNote(note) {
    let notes = [];

    if (fs.existsSync(notesFile)) {
        const data = fs.readFileSync(notesFile, 'utf8');
        notes = JSON.parse(data);
    }

    notes.push({id : notes.length + 1, note: note });


    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}

function loadNotes() {
    if (fs.existsSync(notesFile)) {
        const data = fs.readFileSync(notesFile, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

function updateNote(id, newContent) {

    if (fs.existsSync(notesFile)) {
        const data = fs.readFileSync(notesFile, 'utf8');
        let notes = JSON.parse(data);
        const noteIndex = notes.findIndex(note => note.id === id);

        if (noteIndex !== -1) {
            notes[noteIndex].note = newContent;
            fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
        }
    }
}

function deleteNote(id) {

    if (fs.existsSync(notesFile)) {
        const data = fs.readFileSync(notesFile, 'utf8');
        let notes = JSON.parse(data);
        
        notes = notes.filter(note => note.id !== id);
        fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
    }
}

module.exports = {
    addNote,
    loadNotes,
    updateNote,
    deleteNote
};