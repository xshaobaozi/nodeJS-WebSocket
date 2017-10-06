const Http = require('http');
const Express = require('express');
const App = Express(); 
const Server = Http.createServer(App);
const IO = require('socket.io').listen(Server);

const config = require('./config/config');
const socket = require('./common/socket');

App.use('/', Express.static(config.path));

IO.on('connection', socket);

Server.listen(config.port);

console.log(`server start to http://localhost:${config.port}/`);
