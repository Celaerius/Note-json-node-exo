const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [
        require('../models/user.entity'),
        require('../models/todo.entity'),
    ],
});

module.exports = AppDataSource;