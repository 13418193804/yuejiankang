var express = require('express');
var logger          = require("morgan");
var errorhandler    = require("errorhandler");
var bodyParser      = require("body-parser");
var fs              = require("fs");
var session     = require("express-session");
var cookieParser  = require('cookie-parser');
var compression = require('compression')
//var history = require('connect-history-api-fallback');

var port = 8085;

var app = express();

app.use(cookieParser());

//开启gzip压缩
app.use(compression())
// 接口route
require('./routes')(app);

//jsSDK验证
app.get('/MP_verify_Njd5OGyOMhwpqpnX.txt',function(req,res){
  res.sendFile('/home/yuehealth/MP_verify_Njd5OGyOMhwpqpnX.txt');
});

//开启history模式
//app.use(history());
app.use(express.static('./dist'));
// app.use(logger('combined', {stream: fs.createWriteStream('access.log', {flags: 'a'})}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(errorhandler());


module.exports = app.listen(port,'0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at port :' + port + '\n')
});