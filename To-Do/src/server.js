const app = require('./app');
const config = require('./config');
const reflect = require('reflect-metadata');
const ErrorHandler = require('./errors/errorHandler');
const AppDataSource = require('./config/data-source');

const PORT = config.port || 3030;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${config.nodeEnv} mode.`);
    });
}).catch((error) => {
    ErrorHandler.handleError(error);
    process.exit(1)
});