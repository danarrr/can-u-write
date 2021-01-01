function Parent(){
    this.name = "danarrr"
    this.playArr = [1,2,3]
}

Parent.prototype.getName = function(){
    return this.name
}

function Child() {
    Parent.call(this) // 构造函数继承，否则修改下面实例化对象child2的值的时候child1也会受影响
    this.type = 'child'
}
// 1.不是`指向父类实例`，而是`指向父类原型`
// 2.防止修改Chile类影响Parent类，加多浅拷贝
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

const child1 = new Child()
console.log(child1.name, child1.type)
const child2 = new Child()
child1.playArr.push(4)
console.log(child1.playArr, child2.playArr) // [1,2,3,4] [1,2,3]
