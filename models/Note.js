const fs = require('fs');
const path = require('path');

class Note {
    constructor() {
        this.notesFile = path.join(__dirname, '../data/notes.json');
    }

    loadAll() {
        if (fs.existsSync(this.notesFile)) {
            const data = fs.readFileSync(this.notesFile, 'utf8');
            return JSON.parse(data);
        }
        return [];
    }

    findById(id) {
        const notes = this.loadAll();
        return notes.find(note => note.id === id) || null;
    }

    create(content) {
        const notes = this.loadAll();
        const newNote = {
            id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
            note: content,
            isActive: true,
            createdAt: new Date().toISOString()
        };
        
        notes.push(newNote);
        this.save(notes);
        
        return newNote;
    }

    update(id, newContent) {
        const notes = this.loadAll();
        const noteIndex = notes.findIndex(note => note.id === id);

        if (noteIndex !== -1) {
            notes[noteIndex].note = newContent;
            notes[noteIndex].updatedAt = new Date().toISOString();
            this.save(notes);
            return true;
        }
        
        return false;
    }

    delete(id) {
        const notes = this.loadAll();
        const filteredNotes = notes.filter(note => note.id !== id);
        
        if (filteredNotes.length < notes.length) {
            this.save(filteredNotes);
            return true;
        }
        
        return false;
    }

    toggleActive(id) {
        const notes = this.loadAll();
        const noteIndex = notes.findIndex(note => note.id === id);

        if (noteIndex !== -1) {
            notes[noteIndex].isActive = !notes[noteIndex].isActive;
            notes[noteIndex].updatedAt = new Date().toISOString();
            this.save(notes);
            return true;
        }

        return false;
    }

    save(notes) {
        fs.writeFileSync(this.notesFile, JSON.stringify(notes, null, 2));
    }
}

module.exports = Note;
