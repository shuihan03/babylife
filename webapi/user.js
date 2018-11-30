var express = require("express");
var router = express.Router();
//node 内置 require函数 采用commonjs 规范
let userData = require('../dataAcess/user'); //引入刚才自定义的模块
let userModel=require('../model/user')
 
// var fs = require("fs");
// fs.readFileSync
router.get('/getuser', function (req, res) {
    console.log("请求地址/getuser");
    let id = req.query["id"];
    //回调方式调用 ---begin
    userData.GetUserModel(id, function (data) {
      let result = JSON.stringify(data);
      res.end(result);
      console.log("返回结果"+result); //pm2 启动时，console.log写入txt
    });
    //回调方式调用---end
  })
  
  //promise方式调用---begin
  router.get('/promiseuser',function(req,res)
  {
    let id = req.query["id"];
    userData.PromiseGetUserModel(id).then(data=>
      {let result=JSON.stringify(data);
      res.end(result);
      }
      )
  })
  //promise 方式调用---end
  
  //promise方式调用---begin  全部promise 封装
  router.get('/allpromiseuser',function(req,res)
  {
    let id = req.query["id"];
  
    userData.PromiseGetUserBySql(id).then(data=>
      {let result=JSON.stringify(data);
      res.end(result);
      }
      )
    
  })
  //promise 方式调用---end
  
  
  router.post('/adduser', function (req, res) {
    let name = req.query['name'];
    let mobilePhone = req.query['mobile'];
    userModel.name=name;
    userModel.mobilePhone=mobilePhone;
    userData.AddUser(userModel,function(data){
        res.end(data);
    })
  });
  router.get('',function(req,res){
    res.end('this is  user index');
  })
 
module.exports = router;
