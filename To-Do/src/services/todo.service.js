const { ValidationError, NotFoundError } = require('../errors/ApiErrors');
const AppDataSource = require('../config/data-source');

class TodoService {

    static get repository() {
        return AppDataSource.getRepository('Todo');
    }

    static get userRepository() {
        return AppDataSource.getRepository('User');
    }

    static async getAllTodos() {
        return await this.repository.find({ relations: ['user'] });
    }

    static async findById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: ['user'],
        });
    }

    static async createTodo(todo) {

        let userData = {};

        if (todo.userId) {
            const user = await this.userRepository.findOneBy({ id: todo.userId });
            if (!user) {
                throw new NotFoundError(`Utilisateur avec l'ID ${todo.userId} non trouvé`);
            }
            userData = { user };
        }

        const newTodo = this.repository.create({
            title: todo.title,
            isCompleted: todo.isCompleted || false,
            ...userData,
        });

        return await this.repository.save(newTodo);
    }
}

module.exports = TodoService;
