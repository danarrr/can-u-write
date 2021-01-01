// 数组去重问题 可以先排序后遍历
// 采用hash表方式存储
function unique(nums){
    // 或者用递归的放肆
    let result = new Set()
    for(let num of nums){
        if(!result.has(num)){
            result.add(num)
        }
    }
    return Array.from(result)
}

function sort(nums){
    // 插入排序
    if(nums.length <= 1){return nums}
    const centerIndex = Math.floor(nums.length/2)
    const centerVal = nums.splice(centerIndex, 1)[0]
    
    let left= []
    let right = []
    for(let i = 0; i < nums.length; i++){

        if(nums[i] > centerVal){
            right.push(nums[i])
        } else {
            left.push(nums[i])
        }
    }
    return sort(left).concat(centerVal, sort(right))
}