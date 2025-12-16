const UserService = require('../services/user.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class UserController {

    static getAllUsers = asyncHandlers(async (req, res) => {
        const users = await UserService.findAllUsers();
        res.status(200).json(users);
    });

    static createUser = asyncHandlers(async (req, res) => {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    });
}

module.exports = UserController;
