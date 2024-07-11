/**
 * 手写call
 * 1. 将函数设置为对象的属性
 * 2. 执行或删除这个函数
 * 3. 指定this到函数并传入参数并执行函数
 * 4. 如果没传参，则默认指向window
 * 
 * func.call(thisArg, arg1, arg2, ...); // call的调用方式
 */

Function.prototype._call_ = function (obj, ...args) {
  obj = obj || window;
  obj._fn_ = this;
  obj._fn_(...args);
  delete obj._fn_; // 删除临时属性，保持后面再起调用代码干净
};

/**
 * 手写apply
 * 
 * func.apply(thisArg, [argsArray]); // apply的调用方式
 */

Function.prototype._apply_ = function (context, args) {
  // 判断是否是undefined和null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  let result = context[fnSymbol](...args);
  // delete context[fn];
  return result;
};

// 调用apply函数测试代码
const numbers = [5, 6, 2, 3, 7];
const max = Math.max._apply_(null, numbers);
console.log(max);

/**
 * 手写bind
 * 1. 返回一个函数，绑定this【重点】, 传递预设的参数
 * let boundFunc = func.bind(thisArg, arg1, arg2, ...); // 第一个参数是环境变量
 */
Function.prototype._bind_ = function (context, ...args1) {
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
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
