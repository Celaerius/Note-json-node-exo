const TodoService = require('../services/todo.service');

class TodoController {
    static async getAllTodos(req, res) {
        try {
            const todos = await TodoService.getAllTodos();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
    }

    static async createTodo(req, res) {
        try {
            const { title, completed } = req.body;
            
            const newTodo = await TodoService.createTodo({ title, completed });
            
            if (newTodo === null) {
                return res.status(400).json({ error: 'Le titre de la tâche est requis' });
            }
            
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
        }
    }
}

module.exports = TodoController;
