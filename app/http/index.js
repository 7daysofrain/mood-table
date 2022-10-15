#!/usr/bin/env node

import config from 'config';
import http from 'http';
import express from 'express';
import path from 'path';

const debug = console.log;

export default function createServer(){
    const app = express();
    app.use('/static', express.static( path.join(process.cwd(), 'app/views/web-display/build/static')))
    app.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'app/views/web-display/build/index.html'));
    })
    const server = http.createServer(app);
    server.listen(config.get('http-port'));
    server.on('error', onError);
    server.on('listening', onListening);


    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                throw error;
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                throw error;
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

    return server;
};
