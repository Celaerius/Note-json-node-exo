const NoteController = require('../controllers/NoteController');

function setupRoutes(app) {
    const noteController = new NoteController();

    app.get('/', (req, res) => noteController.index(req, res));
    app.post('/add-notes', (req, res) => noteController.create(req, res));
    app.post('/update-note/:id', (req, res) => noteController.update(req, res));
    app.post('/delete-note/:id', (req, res) => noteController.delete(req, res));
    app.post('/toggle-active/:id', (req, res) => noteController.toggleActive(req, res));

    app.get('/api/notes', (req, res) => noteController.apiGetAll(req, res));
    app.get('/api/notes/:id', (req, res) => noteController.apiGetById(req, res));
}

module.exports = setupRoutes;
