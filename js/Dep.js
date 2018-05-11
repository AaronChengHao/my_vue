// 订阅，发布 收集者
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        console.log('订阅收集器，触发通知事件');
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
