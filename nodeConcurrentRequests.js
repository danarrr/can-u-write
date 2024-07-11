/**
 * 处理多个并发请求，限制同时并发数是五个
 */

// 模拟需要并发处理的任务
// 并发请求函数


/**
 * 如果请求成功则进入下一个 且三个坑位还有剩余则进入下一个
 * 这种写法可以支持，如果有一个挂了，其他两个还是正常进行
 * 更深入的可以封装函数，定义队列来决定何时推入推出：https://juejin.cn/post/7306407473280466981
 */
const concurrencyRequest = (urls, maxNum) => {
  return new Promise((resolve) => { // 需要个容器接收结果
    if(!url || !url.length){resolve([]); return} // 边界情况处理
    
    
    let index = 0; 
    let count = 0; // 全部执行了多少个
    const result = [] // 存储接口返回的结果
    async function request(){
      if(index === urls.length) return;
      const i = index; // 当前索引
      const url = urls[i];
      index++; // 增加索引
      try {
        const resp = await fetch(url)
        console.log('成功了', i)
        result[i] = resp
      } catch(err){
        console.log('失败了', i)
        result[i] = err
      } finally {
        count++;
        if(urls.length === count) {
          resolve(result); // 全部完成啦
        } 
        request() // 还没完成，则加塞下一个请求，注意这里的执行顺序是 1 2 3 =》（2先完成的话） => 1 4 3 递归
      }
    }
  

    const times = Math.min(url.length, maxNum)
    for(let i=0; i<times; i++){
      request()
    }
  })
}


// 测试用例
const urls = [];
for (let i = 1; i <= 20; i++) {
  urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
}
concurrencyRequest(urls, 3).then(res => {
  console.log(res);
})

// 图解：https://juejin.cn/post/7163522138698153997