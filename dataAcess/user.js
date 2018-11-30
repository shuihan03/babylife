let db = require('../util/db-operate');  //引入刚才自定义的模块
let userModel = require('../model/user')
let resultInfo = require('../model/result')
let redisApi=require('../util/redis-api')
//对数据库操作(从show_cascade 表中检索所有字段，并打印出结果)
function GetUserModel(id,callback) {
        let model = new userModel();
        let result=new resultInfo();
        db.query('select * from user where id=?', [id], function (results, fields) {
               
                if (results.length == 1) {
                        model.id = results[0]['id'];
                        model.name = results[0]['name'];
                        model.mobile_phone = results[0]['mobile_phone'];
                        result.flag=true;
                        result.data=model;
                }              
           callback(result);

        });
       
}

function PromiseGetUserModel(id){
    let promise=new Promise(function(resolve,reject)
    {
         redisApi.get(id)
        .then(data=>resolve(data))
        .reject((data)=>
            promiseGetUserBySql.then(resolve(data)
         )         
        );
     })
    return promise;
}
/**
 *  不用用redis 直接操作mysql
 * @param {*} id 
 */
function PromiseGetUserBySql(id){
        let promise =new Promise(function(resolve,reject){
                let model = new user_model();
                let result=new resultInfo();
                let sql='select * from user where id=?';
                db.PromiseQuery(sql,[id]).then((results,feilds)=>{

                        if (results.length == 1) {
                                model.id = results[0]['id'];
                                model.name = results[0]['name'];
                                model.mobile_phone = results[0]['mobile_phone'];
                                result.flag=true;
                                result.data=model;
                        }              
                        resolve(result);
                 
                })
        })
        return promise;
}

/**
 * 对数据库操作(从show_cascade 表中检索所有字段，并打印出结果
 * @param {*} id 
 * @param {*} callback 
 */
function AddUser(userModel,callback) {
        let model = new user_model();
        let result=new resultInfo();
        db.query('insert into user values(?,?,?)', [userModel.id,userModel.name,userModel.mobile_phone], function (results, fields) {
                                 
           callback(result);

        });
       
}
//var test=GetUserModel('1');
module.exports ={GetUserModel,PromiseGetUserModel,PromiseGetUserBySql,AddUser};


