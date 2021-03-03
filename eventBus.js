/**
 * 常用的事件订阅提供四个事件
 * emit()
 * on()
 * off()
 * once()
 */

class EvenBus {
    constructor(){
        this.handlers =  this.handlers || new Map()
    }
}

EvenBus.prototype.emit = function(evenType, ...args){
    let handler = this.handlers.get(evenType)
    handler.length > 0 ? handler.apply(this, args) : handler.call(this)
}

EvenBus.prototype.on = function(evenType, fn){
    if(!this.handlers.get(evenType)){
        this.handlers.set(evenType,fn)
    }
}
EvenBus.prototype.off = function(eventType){
  // 卸载
}

// 测试数据
let Publisher = new EventBus();
let fn = (fn) => {
  console.log(fn);
};

// 触发事件a
Publisher.emit("a", "我是第1次调用的参数");
Publisher.on("a", fn);
