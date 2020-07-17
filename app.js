var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var models = require("./models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRoomRouter = require("./routes/chatRoom");

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var cors = require("cors");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/chatroom", chatRoomRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.io = io;
io.on("connection", (socket) => {
  
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
    
    io.emit("newMessage", {chatMessage});
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
