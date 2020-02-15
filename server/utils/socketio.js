const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const YouDrawIGuessDao = require('../dao/youDrawIGuessDao');


// 切换端口号
io.listen(1234);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('test1', `${msg}1你好啊`);
  });

  // 同步绘画面板图案
  socket.on('dataURI', (data) => {
    // 向房间内所有人广播
    socket.broadcast.to(data.roomNo).emit('dataURI', data.dataURL);
  });

  // 创建房间
  socket.on('create', async (data) => {
    // 创建房间，socket没有创建房间这个选项，只有加入房间
    // 参考：https://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io
    socket.join(data.roomNo);
    // 同时更新数据库这个用户列表，方便别的用户获取
    const obj = {
      username: data.username,
      userId: data.userId,
    };
    const res = await YouDrawIGuessDao.updateRoomInfoOnline(data.roomNo, obj);
  });

  // 某个用户加入房间
  // socket.on('joined', (data) => {
  //   socket.join(data.roomNo);
  //   // io.sockets.clients().forEach((a) => {
  //   //   // .....
  //   //   console.log(a.id);
  //   // });
  //   // 向其它socket发送信息
  //   // socket.broadcast.emit('joined', (data.user.username));
  //   // socket.broadcast.to(data.roomNo).emit('joined', (data.user.username));
  //   socket.to(data.roomNo).emit('joined', data.user.username);
  //
  //   socket.on('say to someone', function(id, msg){
  //     socket.broadcast.to(id).emit('my message', msg);
  //   });
  // });
  socket.on('joined', async (data) => {
    socket.join(data.roomNo);
    // console.log(io.sockets.adapter.rooms);
    socket.broadcast.to(data.roomNo).emit('joined', data.user); // 除了自己
    // io.sockets.in(data.roomNo).emit('joined', data.user); // 包括自己
    const obj = {
      username: data.user.username,
      userId: data.user.userId,
    };
    const res = await YouDrawIGuessDao.updateRoomInfoOnline(data.roomNo, obj);
  });


  socket.on('chat', (chatinfo) => {
    console.log(chatinfo);
    socket.emit('chat', chatinfo);
    socket.broadcast.emit('chat', chatinfo);
  });
});

module.exports = io;
