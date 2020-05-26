/**
 * 柯里化函数两个特性
 * 1.接收一个单一的参数
 * 2.返回一个返回结果的新函数
 */

function createCurry(func, args) {
  return function () {};
}

// 测试数据
const addCurry = createCurry(function (a, b, c) {
  return a + b + c;
});

console.log(addCurry(1)(2)(3)); // 6
console.log(addCurry(1, 2, 3)); // 6
console.log(addCurry(1, 2)(3)); // 6
console.log(addCurry(1)(2, 3)); // 6
