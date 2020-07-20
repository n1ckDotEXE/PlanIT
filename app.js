const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const models = require("./models");

const usersRouter = require('./routes/users');
const chatRoomRouter = require("./routes/chatRoom");
const gardensRouter = require("./routes/gardens")

const app = express();
const cors = require("cors");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use("/users", usersRouter);
app.use("/chatroom", chatRoomRouter);
app.use("/gardens", gardensRouter);

// catch 404 and forward to error handler
app.use(express.static(path.join(__dirname, "client/build")));

app.get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});

app.use(function (req, res, next) {
  next(createError(404));
});

const io = require("socket.io")();
app.io = io;
io.on("connection", (socket) => {
  socket.on("join", async (room) => {
    socket.join(room);
    io.emit("roomJoined", room);
  });

  socket.on("message", async (data) => {
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
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});
module.exports = app;