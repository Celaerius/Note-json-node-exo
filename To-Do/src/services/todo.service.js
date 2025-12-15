const TodoModel = require('../models/todo.model');

class TodoService {
    static async getAllTodos() {
        return await TodoModel.findAll();
    }

    static async createTodo(todo) {
        if (!todo.title || todo.title.trim() === '') {
            return null;
        }

        return await TodoModel.create(todo);
    }
}

module.exports = TodoService;
