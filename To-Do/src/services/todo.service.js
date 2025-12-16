const { ValidationError } = require('../errors/ApiErrors');
const AppDataSource = require('../config/data-source');

class TodoService {

    static get repository() {
        return AppDataSource.getRepository('Todo');
    }

    static async getAllTodos() {
        return await this.repository.find();
    }

    static async findById(id) {
        return await this.repository.findOneBy({ id: id });
    }

    static async createTodo(todo) {
        const newTodo = this.repository.create(todo);
        return await this.repository.save(newTodo);
    }
}

module.exports = TodoService;
