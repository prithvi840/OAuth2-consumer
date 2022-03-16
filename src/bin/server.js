require('dotenv').config();
const http = require('http');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost'

const { app, initApp } = require('../app');
const { setup } = require('./bootstrap');
app.set('port', PORT);
app.set('hostname', HOST);

const server = http.createServer(app);
server.on('listening', onListening);
server.on('error', onError);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`);
}

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind =
      typeof port === 'string'
        ? `Pipe ${app.get('port')}`
        : `Port ${app.get('port')}`;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
}
  

async function startServer() {
    try {
        console.info('Starting server...');
        await initApp();
        await setup();
    
        server.listen(app.get('port'), app.get('hostname'));
    } catch (error) {
        console.error('Server cannot be started', error);
    }
}

startServer();
