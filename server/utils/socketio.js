const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 切换端口号
io.listen(1234);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('test1', msg);
  });
});

module.exports = io;
