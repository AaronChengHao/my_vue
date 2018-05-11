function myVue(option){
    this.el = option.el;
    this.data = option.data;
    option.before && option.before.call(this);
    observe(this.data);
    var el = document.querySelector(this.el);
    new Compile(el,this);
    option.mount &&  option.mount.call(this);
}

