const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.json');

// Read notes and convert to JSON
function readNotesFile() {
const noteData = fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8') : '[]';
if (!noteData) {
    return '[]';
}
return JSON.parse(noteData);
}
const notesData = readNotesFile();

function generateID() {
    return notesData && notesData.length > 0 ? Math.max(...notesData.map(note => note.id)) + 1 : 1;
}

function addNote(note) {
    let notes = [];
    if (notesData) {
        notes = notesData;
    }
    notes.push({id : generateID(), note: note, date: new Date().toISOString() });
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}
    
function loadNotes(note) {
    if (notesData) {
        if (note) {
            let notes = notesData;
            return notes.filter(n => n.note.includes(note));
        } else {
            return notesData;
        }
    }
    return [];
}

function updateNote(id, newContent) {

    if (notesData) {
        let notes = notesData;
        const noteIndex = notes.findIndex(note => note.id === parseInt(id, 10));

        if (noteIndex !== -1) {
            notes[noteIndex].note = newContent;
            fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
        }
    }
}

function deleteNote(id) {

    if (notesData) {
        let notes = notesData;
        index = notes.findIndex(note => note.id === parseInt(id, 10));
        if (index === -1) {
            console.log(`Note with id ${id} not found.`);
            return;
        }
        notes.splice(index, 1);
        fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
        console.log(`Note with id ${id} deleted.`);
    }
}


module.exports = { addNote, loadNotes, updateNote, deleteNote};
