
/**
 * 数据库配置
 */
var dbconfig={
    host:"localhost",
    user : "root",
    password : "870801",
    database : "babylife"
}
//配置中心
var configCenter={
    redisIP:'127.0.0.1',
    redisPort:'6379',
    dbconfig:dbconfig,
}
module.exports=configCenter;