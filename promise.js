/**
 * 简易描述下promise常用的几种状态
 * 拆分为几个功能点分开实现
 * pending, resolve, reject then回调函数
 * catch
 */

// 先来回忆下promise的调用
const promise = new Promise(function(resolve, reject) {
    // ... some code
  
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
promise.then(result => {
    // const res = /*返回的数据*/
})

function myPromise(executor) {
    let _this = this
    _this.$$status = 'pending' // 声明初始状态
    _this.failCallBack = undefined; 
    _this.successCallback = undefined;
   
    executor(resolve.bind(this), reject.bind(this))
   
    function resolve(opts){
        // 修改状态值
        if(_this.$$status === 'pending'){
            _this.$$status = 'full'
            _this.successCallback(opts)
        }
    }
    function reject(){
        // 修改状态值
        if(_this.$$status === 'pending'){
            _this.$$status = 'fail'
            _this.failCallBack(opts)
        }
    }
}

// 拓展then回调函数接收结果
myPromise.prototype.then = function (full,fail){
    this.successCallback = full
    this.failCallBack = fail
}




new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 200);
}).then( result => { console.log(result) })


/**
 * 进阶 promise出现的最大的意义是解决了回调地狱，而且我们所知的是执行Promise会返回一个新的promise对象
 */
// 先回忆下promise的链式调用
function begin() {
    return new Promise(resolve => {
      setTimeout(_ => resolve('first') , 2000)
    })
}

begin().then(data => {
  console.log(data)
  return new Promise(resolve => {

  })
}).then(res => {
  console.log(res)
}); 
// 之所以可以链式调用, 是因为每个then函数会返回一个新的promise对象
// so 扩展下上面的代码

function myPromise(executor) {
    let _this = this
    _this.$$status = 'pending' // 声明初始状态
    _this.failCallBack = undefined; 
    _this.successCallback = undefined;
   
    setTimeout(_ => {
        executor(_this.resolve.bind(_this))
    })
}
   
   
    // function reject(){
    //     // 修改状态值
    //     if(_this.$$status === 'pending'){
    //         _this.$$status = 'fail'
    //         _this.failCallBack(opts)
    //     }
    // }
// }

myPromise.prototype.resolve = function(opts){
    // 修改状态值
    if(_this.$$status === 'pending'){
        _this.$$status = 'full'
        let result = _this.successCallback(opts)// 存储调用resolve传进来的成功值
        if(result && result instanceof myPromise){
            result.then(_this.successDefer, _this.failDefer)
            return  ''
        }
        _this.successDefer(result)
    }
}

// 拓展then回调函数接收结果
myPromise.prototype.then = function (full,fail){
    this.successCallback = full
    this.failCallBack = fail
    let newMyPromise = new myPromise(_ => {})
    this.successDefer = newMyPromise.resolve.bind(newMyPromise)
    this.failDefer = newMyPromise.resolve.bind(newMyPromise)

    return newMyPromise
}