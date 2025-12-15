const TodoService = require('../services/todo.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class TodoController {

    static getAllTodos = asyncHandlers(async (req, res) => {
        const todos = await TodoService.getAllTodos();
        res.status(200).json(todos);
    });

    static createTodo = asyncHandlers(async (req, res) => {
        const newTodo = await TodoService.createTodo(req.body);
        if (!newTodo) {
            return res.status(400).json({ message: 'Titre de la tâche invalide' });
        }
        res.status(201).json(newTodo);
    });
}

module.exports = TodoController;
