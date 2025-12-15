const app = require('./app');
const config = require('./config');

const PORT = config.port || 3030;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${config.nodeEnv} mode.`);
});