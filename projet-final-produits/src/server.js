const app = require('./app');
const config = require('./config');

const server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
});

// Gestion des erreurs non attrapées
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

module.exports = server;
