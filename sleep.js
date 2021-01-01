//比如 sleep(1000) 意味着等待1000毫秒
// promise
const sleep = (time) =>{
    return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(result => console.log("执行完毕"))

// Async
const sleep = (time) =>{
    return new Promise(resolve => setTimeout(resolve, time))
}

async function output() {
    const output = await sleep(2000)
    console.log("执行完毕async")
    return output
}

output()