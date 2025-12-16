const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [],
});

module.exports = AppDataSource;