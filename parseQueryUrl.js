// 解析url参数为对象
function parseQueryStrin(url) {
    // 当前网站域名信息可以直接获取
    // const {
    //     protocol, 
    //     host,
    //     search,
    // } = window.location
    
    const paramStr = url.match(/.+\?(.+)$/)[1] // 截取 ？后的内容
    const paramsArr = paramStr.split('&')
    let paramsObj = {} // 最终返回的对象
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); 
            // 边界情况处理 数字 || 中文
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

            paramsObj[key] = val
        } else { // 处理没有 value 的函数
            paramsObj[param] = true;
        }
    });
    return paramsObj
}