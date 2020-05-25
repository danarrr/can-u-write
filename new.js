/**
 * 主要做了四件事：
 * 1.创建一个新对象
 * 2.继承父类原型上的方法
 * 3.添加父类的属性到新属性并初始化
 * 4.并返回一个新的对象
 */
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
