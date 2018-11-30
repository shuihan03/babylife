let express = require("express");
let path=require('path')
let fs=require('fs')
let router = express.Router();



router.get('/index.htm', function (req, res) {
    res.sendFile( path.join(__dirname,'../views/index.htm'));
  })
  router.get('/error.htm', function (req, res) {
    res.sendFile( path.join(__dirname,'../views/error.htm'));
  })
  router.get('/upload.htm', function (req, res) {
    res.sendFile( path.join(__dirname,'../views/upload.htm'));
  })
  router.post('/file_upload', function (req, res) {
 
    console.log(req.files[0]);  // 上传的文件信息
    //文件路径
    var des_file = path.resolve( __dirname,'../files')+"/"  + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })
  module.exports=router;