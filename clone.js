/**
 * 浅拷贝 || 深拷贝
 * 先说一下两者区别：
 * 首先是两种数据类型的拷贝 基础数据类型 和 引用数据类型
 * 浅拷贝：只复制指针，不复制对象本身。
 * 深拷贝：复制并创建一个一摸一样的对象，但不共享内存。
 */

/**
 * 手写深拷贝
 * 深拷贝的两种方式
 * 1.递归
 * 2.用JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象。
 *
 */
function deepClone(obj, map = new Map()) {
  if (!obj || typeof obj !== "object") return obj;

  // 判断是否为数组
  let cloneTarget = Array.isArray(obj) ? [] : {};
  if (map.get(obj)) return map.get(cloneTarget);

  map.set(obj, cloneTarget);
  // 递归
  for (const key in obj) {
    cloneTarget[key] = deepClone(obj[key], map);
  }
  return cloneTarget;
}

// 测试数据
var info = {
  name: "zhangsan",
  age: "18",
  language: {
    name: {
      age: 123,
      work: "it",
    },
  },
};

deepClone(info);
