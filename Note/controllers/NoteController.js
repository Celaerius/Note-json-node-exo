const Note = require('../models/Note');

class NoteController {
    constructor() {
        this.noteModel = new Note();
    }

    index(req, res) {
        try {
            const notes = this.noteModel.loadAll();
            const view = require('../views/noteView');
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(view.renderIndex(notes));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erreur lors du chargement des notes");
        }
    }

    create(req, res) {
        try {
            if (!req.body || !req.body.note) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Le contenu de la note est requis");
            }

            this.noteModel.create(req.body.note);
            res.writeHead(302, { "Location": "/" });
            res.end();
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erreur lors de la création de la note");
        }
    }

    update(req, res) {
        try {
            const noteId = parseInt(req.params.id, 10);
            
            if (!req.body || !req.body.newContent) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Le nouveau contenu est requis");
            }

            const success = this.noteModel.update(noteId, req.body.newContent);
            
            if (success) {
                res.writeHead(302, { "Location": "/" });
                res.end();
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Note non trouvée");
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erreur lors de la mise à jour de la note");
        }
    }

    delete(req, res) {
        try {
            const noteId = parseInt(req.params.id, 10);
            const success = this.noteModel.delete(noteId);
            
            if (success) {
                res.writeHead(302, { "Location": "/" });
                res.end();
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Note non trouvée");
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erreur lors de la suppression de la note");
        }
    }

    toggleActive(req, res) {
        try {
            const noteId = parseInt(req.params.id, 10);
            const success = this.noteModel.toggleActive(noteId);
            
            if (success) {
                res.writeHead(302, { "Location": "/" });
                res.end();
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Note non trouvée");
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erreur lors de la mise à jour de l'état actif de la note");
        }
    }

    apiGetAll(req, res) {
        try {
            const notes = this.noteModel.loadAll();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(notes, null, 2));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Erreur lors du chargement des notes" }));
        }
    }

    apiGetById(req, res) {
        try {
            const noteId = parseInt(req.params.id, 10);
            const note = this.noteModel.findById(noteId);
            
            if (note) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(note, null, 2));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Note non trouvée" }));
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Erreur lors du chargement de la note" }));
        }
    }
}

module.exports = NoteController;
