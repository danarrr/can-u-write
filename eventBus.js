/**
 * 常用的事件订阅提供四个事件
 * emit()
 * on()
 * off()
 * once()
 */

class EventBus {
  constructor() {
    this.handlers = {};
  }

  // 订阅事件
  on = function (eventType, handler) {
    if (!(eventType in this.handlers)) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
    return this;
  };

  // 发布事件
  emit = function (eventType) {
    let handlerArgs = Array.prototype.slice.call(arguments, 1);
    if (this.handlers[eventType]) {
      this.handlers[eventType].forEach((item, idx) => {
        this.handlers[eventType][idx].apply(this, handlerArgs);
      });
    }
    return this;
  };

  // 卸载事件
  off = function (eventType) {};

  once = function (eventType) {};
}

// 测试数据
let Publisher = new EventBus();
let fn = (fn) => {
  console.log(fn);
};

// 触发事件a
Publisher.emit("a", "我是第1次调用的参数");
Publisher.on("a", fn);
