// 元素和指令编译类
function Compile(el,vm){
    this.vm = vm;
    this.startCompile(el);
}

Compile.prototype.startCompile = function(el){
    var _this = this;
    var childs = el.childNodes;
    if (childs && childs.length) {
        childs.forEach(function( node ){
            if (node.nodeType == 1) {
                _this.compileAttribute(node);
                // 递归编译文档元素节点
                _this.startCompile(node);
            }
            if (node.nodeType ==3) {
                _this.compileText(node);
            }
        });
    }
}

Compile.prototype.compileText = function(node){
    var reg = /\{\{(.*)\}\}/;
    var text = node.textContent;
    if (reg.test(text)) {
        var exp = reg.exec(text)[1];
        console.log(this.vm);
        node.textContent = this.vm.data[exp];
        // 绑定 exp 并监听改动 watch
        // 实例化一个 watcher 实现对该 exp 的监听
        var watcher = new Watcher(this.vm,exp,node,function(node,val){
            node.textContent = val;
        });
    }
}

Compile.prototype.compileAttribute = function(node){
    var attributes = node.attributes;
    var _this = this;
    Array.prototype.forEach.call(attributes,function(attr){
        var dir = attr.name;
        var exp = attr.value;
        if (Directive.isDirective(dir)) {
            _this.compileDirective(node,dir,exp);
        }
    });
}

Compile.prototype.compileDirective = function( node,dir,exp ){
    if (Directive.isModel(dir)) {
        this.compileModelDirective(node,exp);
    }
}

Compile.prototype.compileModelDirective = function( node,exp ){
    var _this = this;
    var val = this.vm.data[exp];
    node.value = val;
    new Watcher(this.vm,exp,node,function(node,val){
        node.value =val;
    });
    node.addEventListener('input',function(e){
        var newVal = e.target.value;
        _this.vm.data[exp] = newVal;
    });
}


