// 数组去重(对象数组的去重）
  const uniq= arr => {
    const tmp = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(tmp).map((item) => JSON.parse(item));
  }
  uniq([{a:'1'},{a:'1'}]) //[{a:'1'}]

//普通数组去重
const removeItems = arr => [...new Set(arr)];
removeItems([42, 'foo', 42, 'foo', true, true]);

//set实现并集 交集  差集
let a = new Set([1,2,3])
let b = new Set([4,3,2])

  //并(合并数组）
  let union = new Set([...a,...b]);
  //set {1,2,3,4}
  //交集
  let inter = new Set([...a].filter(x=>b.has(x)));
  //set {2,3}
  //差集
  let differ = new Set([...a].filter(x=>!b.has(x)));
   //set {1}

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




