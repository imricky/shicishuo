const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 切换端口号
io.listen(1234);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('test1', `${msg}1你好啊`);
  });

  socket.on('dataURI', (dataURI) => {
    // socket.emit('dataURI', dataURI);
    socket.broadcast.emit('dataURI', dataURI);
  });

  socket.on('chat', (chatinfo) => {
    socket.emit('chat', chatinfo);
    socket.broadcast.emit('chat', chatinfo);
  });
});

module.exports = io;
