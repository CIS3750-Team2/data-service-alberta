require('dotenv').config();
const {env: {REDIS_URL}} = process;

const Queue = require('bull');
const {province} = require('./constants');

process.on('unhandledRejection', (err) => console.error('Uncaught error', err));

const state = {};

const init = async () => {
    state.refreshQueue = new Queue('refresh', REDIS_URL);
    state.updateQueue = new Queue('update', REDIS_URL);
    state.refreshQueue.process(
        province,
        1,
        require('./processor')(state)
    );

    return require('./startup')(state);
};

init().then((data) => console.log(`
    Started data-service for ${province}.
    Redis   = ${REDIS_URL}
    Startup = ${JSON.stringify(data)}
`), () => console.log(`
    Failed to start data-service for ${province}.
`));
