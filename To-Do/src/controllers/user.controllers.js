const UserService = require('../services/user.service');
const { asyncHandlers } = require('../utils/asyncHandlers');

class UserController {

    static getAllUsers = asyncHandlers(async (req, res) => {
        const users = await UserService.findAllUsers({todo: true});
        res.status(200).json(users);
    });

    static getUserById = asyncHandlers(async (req, res) => {
        const user = await UserService.findUserById(parseInt(req.params.id, 10));
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    });

    static createUser = asyncHandlers(async (req, res) => {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    });
}

module.exports = UserController;
