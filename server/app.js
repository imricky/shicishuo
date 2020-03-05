const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const history = require('connect-history-api-fallback');

const app = express();
// face++前端传图片过来的时候，需要加上这三行，不然会请求体太大了
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// io.listen(1234);
//
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('test1', msg);
//   });
// });

require('./utils/mongo');
require('./utils/elasticsearch');
require('./utils/socketio');
const { checkToken } = require('./utils/auth');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const poemsRouter = require('./routes/poems');
const drawRouter = require('./routes/youDrawIGuess');
const faceMusicRouter = require('./routes/faceMusic');


// allow custom header and CORS
app.all('*', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // 跨域请求的域名端口号
  res.header('Access-Control-Allow-Origin', '*'); // 跨域请求的域名端口号
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    // 让options请求快速返回/
    res.send({
      code: 200,
      msg: 'OK',
    });
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 该死的这个，用了直接404
// app.use(history());

// 后端添加token校验
app.use(checkToken);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/poems', poemsRouter);
app.use('/draw', drawRouter);
app.use('/faceMusic', faceMusicRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
