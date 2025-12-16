const AppDataSource = require('../config/data-source');

class UserService {
    static get repository() {
        return AppDataSource.getRepository('User');
    }

    static async findAllUsers() {
        return await this.repository.find({ relations: ['todos'] });
    }

    static async findUserById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: ['todos'],
        });
    }

    static async createUser(user) {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }
}

module.exports = UserService;