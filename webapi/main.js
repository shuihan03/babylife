
let morgan=require('morgan')
let fs=require('fs')
let path=require('path')
let express = require('express');
let app = express();
let userRoot=require('./user');

//打印日志
let accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


//注册路由
app.use('/user',userRoot);
app.get('',function(req,res){
  res.end("hello world");
})
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})