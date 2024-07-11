// 柯里化 将函数执行结果传递给下一个函数
function compose () {
    const compose = ( ...[first, ...other] ) => ( ...args ) => {
        let ret = first( ...args )
        other.forEach( fn => { ret = fn( ret ) } )
        return ret
    }
    const fn = compose( add, square ) 
    console.log( fn( 1, 2 ) )
}

// 简单柯里化, 一维
const a = ( a, b ) => { return a * b }
const b = ( y ) => { return y + 1 }
const c = (z) => { return z*z}


// 柯里化 多层函数
const compose = (...[first, ...others]) => (...args) => {
    let ret = first(...args)
    others.forEach(fn => {
        ret = fn(ret)
    })
    return ret // return叠加了上一个函数结果
}

const fn = compose(a, b, c)(4, 5) //abc三个函数结果叠加



// 实现洋葱模型/中间件

// 测试用例
async function fn1(next){
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next){
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}

function fn3(next){
    console.log('fn3')
}

function delay(){
    return Promise.resolve(res => {
        setTimeout(() => reslove(),2000)
    })
}

const middlewares = [fn1,fn2,fn3] // 把函数用数组的方式传入
const finalFn = compose(middlewares)
finalFn()

// 递归的写法 辅助理解
function originCompose(){
    return Promise.resolve(
        fn1(function next(){
            return Promise.resolve(
                fn2(function next(){
                    return Promise.resolve(
                        fn3(function next(){
                            return Promise.resolve()
                        })
                    )
                })
            )
        })
    )
}
originCompose().then(res => console.log(res)).catch(err => console.log(err))

// 洋葱模型
function compose (middlewares){
    return function() {
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(
                    function next() {
                        return dispatch(i+1)
                    }
                )
            )
        }
    }
}

// koa源码学习 https://zhuanlan.zhihu.com/p/470944919
// 1.context上下文的执行顺序
// 2.application 应用抽离
// 3.中间件原理 洋葱模型 √
// 4.koa实现路由拦截