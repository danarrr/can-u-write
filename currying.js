/**
 * 柯里化函数两个特性
 * 1.接收一个单一的参数
 * 2.返回一个返回结果的新函数
 */

function createCurry(func, length) {
  length = length || func.length;

  return function (...args) {
    if (args.length >= length) {
      // 如果实参的个数 大于等于 传递的参数
      return func.apply(this, args);
    } else {
      return createCurry(func.bind(this, ...args), length - args.length);
      // bind 返回新函数体，不执行；
    }
  };
}

// 测试代码
let funcCount = function (a, b, c) {
  return a + b + c;
};

let addCurry = createCurry(funcCount);

console.log(addCurry(1)(2)(3)); // 6
console.log(addCurry(1, 2, 3)); // 6
console.log(addCurry(1, 2)(3)); // 6
console.log(addCurry(1)(2, 3)); // 6
