const TodoModel = require('../models/todo.model');
const { ValidationError } = require('../errors/ApiErrors');

class TodoService {
    static async getAllTodos() {
        return await TodoModel.findAll();
    }

    static async createTodo(todo) {
        if (!todo.title || todo.title.trim() === '') {
            throw new ValidationError('Titre obligatoire, veuillez le fournir.', 400);
        }

        return await TodoModel.create(todo);
    }
}

module.exports = TodoService;
