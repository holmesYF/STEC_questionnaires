var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var linebotRouter = require("./routes/linebot");
const cron = require('node-cron');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.listen(process.env.PORT || 3000);
//ポート開放なぜかいらない
//wwwにもうあった

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/bot/webhook", linebotRouter);

// cron.schedule('* * * * * *', () => console.log('毎秒実行'));
module.exports = app;
