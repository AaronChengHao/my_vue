// 绑定数据监听者
function Watcher(vm,exp,node,closure){
    this.vm = vm;
    this.node = node;
    this.exp = exp;
    this.closure = closure;
    this.depTarget();
}

Watcher.prototype.update = function(){
    var val = this.vm.data[this.exp];
    this.closure.call(this.vm,this.node,val);
}

Watcher.prototype.depTarget = function(){
    Dep.target = this;
    this.val = this.vm.data[this.exp];
    Dep.target = null;
}
