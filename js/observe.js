// observe 数据观察者
function observe(data){
    if (typeof data != 'object') {
        return false;
    }
    Object.keys(data).forEach(function(key){
        var val = data[key];
        var dep = new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set:function(newVal){
                if (val != newVal) {
                    val = newVal;
                    // 通过订阅搜集器通知监听者
                    dep.notify();
                }
            }
        });
    });
}

