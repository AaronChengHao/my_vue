// 指令类
function Directive(){

}

Directive.isDirective = function( directive ){
    return directive.indexOf('v-') == 0;
}

Directive.isModel = function(directive){
    return directive.indexOf('v-model') == 0;
}
