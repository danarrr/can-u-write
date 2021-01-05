// 任务
const timeout = i => {
    new Promise(reslove => {
        setTimeout(() => reslove(i), i)
        console.log("这是哪个异步任务", i)
    })
}

// 模拟四个任务[1000, 2000, 3000, 4000]
asyncPool(2, [1000, 2000, 3000, 4000], timeout).then(result => {
    // console.log(result)
})


/**
 poolLimit 限制并发数
 iteratorFn  回调函数
 */
function asyncPool(poolLimit, tasks, iteratorFn) {
    let i = 0;
    const ret = [];
    const executing = [];
    const enqueue = function () {
        // 边界处理
        if (i === tasks.length) {
            return Promise.resolve();
        }
        // 每调一次enqueue，初始化一个promise
       
        const currTask = tasks[i++];
        const p = Promise.resolve().then(() => iteratorFn(currTask, tasks));
        // 放入promises数组 
        ret.push(p);
        // promise执行完毕，从executing数组中删除
        const e = p.then(() => {
            executing.splice(executing.indexOf(e), 1)
        });
        // 插入executing数字，表示正在执行的promise
        executing.push(e);
        // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
        let r = Promise.resolve();
        if (executing.length >= poolLimit) {
            r = Promise.race(executing);
        }
        // 递归，直到遍历完array
        return r.then(() => enqueue());
    };
    return enqueue().then(() => Promise.all(ret));
}