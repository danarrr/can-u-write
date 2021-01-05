//输入
const tmp = `
  <h1>{{person.name}}</h1>
  <address>{{person.address}}</address>
  <samll>{{person.mather}}</samll>
`;
//需要编写render函数
const html = render(tmp, {
  person: {
    name: 'petter',
    address: '409 Brookview Drive',
  },
});

//期望的输出
const expect = `
  <h1>petter</h1>
  <address>409 Brookview Drive</address>
`

//  实现一个render
function render(tmp, data){
    let template = tmp
    function work(node, str){
        // 遍历节点
        for (let key in node) {
            if (typeof node[key] === 'object') {
                str+= key + '.'
                // console.log("node==", node, key)
                // console.log("str===", str)
                work(node[key], str)
                // str = str.substring(0, str.length - key.length - 1);
            } else {
                template = template.replace('{{' + str + key + '}}', node[key]);
            } 
        }
    }
    work(data, '')
    template = template.replace(/\{\{((?:.|\r?\n)+?)\}\}/g, '') // 过滤掉转义字符串
    console.log("编译之后的模板", template)
}