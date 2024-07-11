/**
 * 主要做了四件事：
 * 1.创建一个新对象
 * 2.继承父类原型上的方法
 * 3.添加父类的属性到新属性并初始化
 * 4.并返回一个新的对象
 */

// 1、用new Object()的方式新建了一个对象obj
// 2、取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments会被去除第一个参数
// 3、将 obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
// 4、使用apply，改变构造函数this 的指向到新建的对象，这样 obj就可以访问到构造函数中的属性
// 5、返回 obj
function _new() {
  let obj = new Object();
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let result = Constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}

// 用w3c的例子来调用下实现的这个构造函数
function Car(name, age) {
  this.name = name;
  this.age = age;
}

Car.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};
// 调用我们创建的new操作符
let getCarInfo = _new(Car, "Kevin", "18");

console.log(getCarInfo.name); // Kevin
getCarInfo.sayYourName(); // I am Kevin
