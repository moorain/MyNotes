// 数组去重(对象数组的去重）
  const uniq= arr => {
    const tmp = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(tmp).map((item) => JSON.parse(item));
  }

  uniq([{a:'1'},{a:'1'}]) //[{a:'1'}]


//普通数组去重
const removeItems = arr => [...new Set(arr)];
removeItems([42, 'foo', 42, 'foo', true, true]);


//数组求和
 arr.reduce((a, b) => a + b));

//可迭代对象转化为数组
function getArr(...params) {
    let arg = Array.from(arguments);
    console.log(arg);
}
getArr('a', 26, 'b');//["a", 26, "b"]


//Array.of创建新数组
let arr = Array.of(1, 2);
console.log(arr.length);//2


//合并数组
var arr1 = ['a'];
var arr2 = ['b'];
var arr3 = ['c'];
// ES5:
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c']
// ES6:
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c']


//一个树形json的数据处理 传入id获取name 
    const arr1 = [
      {
        id: '1',
        name: 'a1',
        children: [
          {
            id: '1-1',
            name: 'a11',
            children: [
              {
                id: '1-1-1',
                name: 'a111',
                children: [
                ]
              }
            ]
          }
        ]
      }, {
        id: '2',
        name: 'a2',
        children: [
          {
            id: '2-1',
            name: 'a21',
            children: [
              {
                id: '2-1-1',
                name: 'a211',
              }
            ]
          }
        ]
      }
    ]
    
    const getName = (id, data) => {
      const idArr = id.split('-')
      let j = 1;
      let name = null;
      const named = (list) => {
        const theId = idArr.slice(0, j).join('-');
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.id === theId) {
            if (id === item.id) {
              name = item.name;
              break;
            } else {
              j++;
              item.children && named(item.children)
            }
          }
        }
        return name;
      }
      return named(data);
    }
    console.log(getName('1-1', arr1))   //a11

