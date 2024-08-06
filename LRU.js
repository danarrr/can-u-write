/**
 * @param {number} capacity
 */
// 最近最少使用
var LRUCache = function(capacity) {
  this.size = capacity;
  this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.map.has(key)) {
    const value = this.map.get(key);
    this.map.delete(key); // 获取的时候，如果有这个value。则将这个value的位置更新到最新
    this.map.set(key, value);
    return value;
  } else {
    return -1;
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (!this.map.has(key)) {
    //如果不存在
    this.map.set(key, value);
  } else {
    //如果存在，需要将它的位置更新至最新
    this.map.delete(key);
    this.map.set(key, value);
  }
  //set完了，看看是否超容量了
  if (this.map.size > this.size) {
    //需要将最老的作废掉 将map转为对象/数组，第零项就是要废除的
    this.map.delete(Array.from(this.map)[0][0]);
  }
};
// 素不素很简单
