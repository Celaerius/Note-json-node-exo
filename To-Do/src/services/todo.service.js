const { ValidationError } = require('../errors/ApiErrors');
const AppDataSource = require('../config/data-source');

class TodoService {

    static get repo() {
        return AppDataSource.getRepository('Todo');
    }

    static async getAllTodos() {
        return await this.repo.find();
    }

    static async findById(id) {
        return await this.repo.findOneBy({ id: id });
    }

    static async createTodo(todo) {
        const newTodo = this.repo.create(todo);
        return await this.repo.save(newTodo);
    }
}

module.exports = TodoService;
