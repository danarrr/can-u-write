/**
 * 手写call
 * 1. 将函数设置为对象的属性
 * 2. 执行或删除这个函数
 * 3. 指定this到函数并传入参数并执行函数
 * 4. 如果没传参，则默认指向window
 */
Function.prototype._call_ = function (obj, ...args) {
  obj = obj || window;
  obj._fn_ = this;
  obj._fn_(...args);
  delete obj._fn_;
};

/**
 * 手写apply
 */

/**
 * 手写bind
 * 1. 返回一个函数，绑定this, 传递预设的参数
 */
Function.prototype._bind_ = function (context = window, ...args1) {
  let self = this;
  return function (...arg2) {
    return self.apply(context, args1.concat(arg2));
  };
};

// 调用bind函数继承
const obj = {
  name: "校长",
  objAge: this.age,
  myFunc: function (city) {
    console.log(this.name + this.age + "来自:" + city);
  },
};
const db = {
  name: "danarrr",
  age: 23,
};

obj.myFunc._bind_(db, "成都", "上海")();
// danarrr23来自成都
