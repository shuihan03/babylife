let redis=require('redis')
let config=require('../config')
let client=redis.createClient(config.redisPort,config.redisIP);
client.on("error",function(error){
    console.log(error);
})
/**
 * 设置redis值
 * @param {*} key 
 * @param {*} value 
 */
const set=function(key,value){
  let promise=new Promise(function(resolve,reject){
    client.set(key, value, function (err, response) {
        if (err) {
            reject(error);
            console.log("err:", err);
        } else {
            resolve(response);
            console.log(response);
           
        }
    });
  });
  return promise;
    
}

/**
 * 根据redis key获取value
 * @param {*} key  redis key 
 */
const get=function(key){
    let promise=new Promise(function(resolve,reject){
        client.get(key, function (err, response) {
            if (err) {
                reject(err);
                console.log("err:", err);
            } else {
                if(response===null){
                    reject(err);
                }else{
                    resolve(response);
                }
                console.log(response);
                client.end();
            }
        });
    })
    return promise;
   
} 
module.exports={get,set}