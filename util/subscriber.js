
//订阅
var sub1={
    update:function(){
        console.log(1);
    }
}
var sub2={
    update:function(){
        console.log(2);
    }
}
var sub3={
    update:function(){
        console.log(3);
    }
}
function Dep(){
    this.subers=[];
    //订阅，添加订阅者
    this.addSuber=function(item){
        this.subers.push(item)
    }
    //发布消息
    this.deliver=function(){
        for(var i=0;i<this.subers.length;i++)
        {
            this.subers[i].update();
        }
    }
    
}
//发布消息
var dep=new Dep();
dep.addSuber(sub1);
dep.addSuber(sub2);
dep.addSuber(sub3);

dep.deliver();