var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require("./models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRoomRouter = require("./routes/chatRoom");

var app = express();
const cors = require("cors");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/chatroom", chatRoomRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


const io = require("socket.io")();
app.io = io;
io.on("connection", socket => {
  socket.on("join", async room => {
    socket.join(room);
    io.emit("roomJoined", room);
  });

  socket.on("message", async data => {
    const { chatRoomName, author, message } = data;
    const chatRoom = await models.ChatRoom.findAll({
      where: { name: chatRoomName },
    });
    const chatRoomId = chatRoom[0].id;
    const chatMessage = await models.ChatMessage.create({
      chatRoomId,
      author,
      message: message,
    });
    io.emit("newMessage", chatMessage);
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
