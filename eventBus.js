/**
 * 常用的事件订阅提供四个事件
 * emit() ，触发事件。触发一次事件，会执行事件对应的所有回调。
 * on() 订阅事件。将事件的回调存到events中。
 * off()
 * once()
 * 实现思路：
 * on 将events推入队列
 * emit 将event取出来执行回调
 * off delete某个event
 * once 创建[函数A]执行off函数，然后将[函数A]传入on函数进行执行；这样执行完函数就会自动卸载
 */

class EvenBus {
  constructor() {
    this.handlers = this.handlers || new Map()
  }
}

// 触发事件 (发布)
EvenBus.prototype.emit = function (evenType, ...args) {
  let handler = this.handlers.get(evenType)
  handler.length > 0 ? handler.apply(this, args) : handler.call(this)
}

//注册事件（订阅）订阅事件
EvenBus.prototype.on = function (evenType, fn) {
  if (!this.handlers.get(evenType)) {
    this.handlers.set(evenType, fn) // 如果没有存在过，则创建新的
  }
}
EvenBus.prototype.off = function (eventType) {
  // 卸载
  this.handlers.delete(eventType);
}

EvenBus.prototype.once = function (eventType) {
  // 执行完毕之后卸载
  const onceHandler = (...args) => {
    fn.apply(this, args);
    this.off(eventType); // 执行完毕后卸载事件
  };
  this.on(eventType, onceHandler);
}


// 测试数据
let Publisher = new EvenBus();
let fn = (fn) => {
  console.log(fn);
};

// 触发事件a
Publisher.on("a", fn);
Publisher.emit("a", "我是第1次调用的参数");

// 更完善的写法
class EventEmitter {
  constructor() {
    this.events = {};
  }
  //触发，传递参数
  emit(event, ...args) {
    const cbs = this.events[event];
    // 因为下方off会将this.events[event]重新赋值为null，所以需要判断一下
    if (!cbs) {
      console.log('没有当前事件');
      return this;
    }

    //遍历执行所有回调
    cbs.forEach((cb) => {
      cb(...args)
    });

    // 为了可以链式调用
    return this;
  }

  //监听，执行回调
  on(event, cb) {
    //如果events里面没有事件监听，那么就初始化为一个数组
    //为什么是数组，因为一个事件可能有多个监听，你触发一次，多个监听都会执行
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
    return this;
  }

  //移除监听回调
  off(event, cb) {
    //注册一个方法，只执行一次，执行完成后直接注销掉
    const func = (...args) => {
      //先把事件监听移除掉，再去执行cb
      this.off(event, func);
      cb(...args);
    };
    this.on(event, func);
    return this;
  }

  // 只监听一次，执行回调
  once(event, cb) {
    //如果没有cb，那就意味着移除所有监听
    //有的话，那就去除这个毁掉
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter(
        (it) => it !== cb
      );
    }
    return this;
  }
}


// function user1 (content) {
//     console.log('用户1订阅了:', content);
// }

// function user2 (content) {
//     console.log('用户2订阅了:', content);
// }

// function user3 (content) {
//     console.log('用户3订阅了:', content);
// }

// function user4 (content) {
//     console.log('用户4订阅了:', content);
// }

// // 订阅
// Publisher.on('article1', user1);
// Publisher.on('article1', user2);
// Publisher.on('article1', user3);

// // // 取消user2方法的订阅
// Publisher.off('article1', user2);

// Publisher.once('article2', user4)

// // // 发布
// Publisher.emit('article1', 'Javascript 发布-订阅模式');
// Publisher.emit('article1', 'Javascript 发布-订阅模式');
// Publisher.emit('article2', 'Javascript 观察者模式');
// Publisher.emit('article2', 'Javascript 观察者模式');

// Publisher.on('article1', user3).emit('article1', 'test111');

// /*
//     用户1订阅了: Javascript 发布-订阅模式
//     用户3订阅了: Javascript 发布-订阅模式
//     用户1订阅了: Javascript 发布-订阅模式
//     用户3订阅了: Javascript 发布-订阅模式
//     用户4订阅了: Javascript 观察者模式
// */