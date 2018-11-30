
let morgan=require('morgan')
let fs=require('fs')
let path=require('path')
let express = require('express');
let app = express();
let userRoot=require('./user');
let pageRoot=require('./pages')

//打印日志
let accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


//上传文件支持 ---begin
var bodyParser = require('body-parser');
var multer  = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
//上传文件支持 --end;本部分放在app.use 注册路由之前。否则上传时，req.files[0] 报错

//注册路由
app.use('/user',userRoot);
app.use('/view',pageRoot);
//处理静态文件，html，css ,js,image等;url 不用输入public;http://localhost/logo.png
app.use(express.static('../public'));
app.get('',function(req,res){
  res.end("hello world");
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})