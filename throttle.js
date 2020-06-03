/**
 * 防抖与节流的区别
 * 防抖： 触发高频事件n秒内函数只会执行一次，如果n秒内再次触发，则 重新开始计算时间
 * 节流： 触发高频事件n秒内函数只会执行一次，如果n秒内不允许再次触发
 */
/**
 * 手写防抖
 *
 */
const debounce = (func) => {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, 500);
  };
};
/**
 * 手写节流
 */
const throttle = () => {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      func.apply(this, arguments);
      canRun = right;
    }, 500);
  };
};
