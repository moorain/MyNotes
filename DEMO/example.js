// 数组去重(对象数组的去重）
  const uniq= arr => {
    const tmp = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(tmp).map((item) => JSON.parse(item));
  }

  uniq([{a:'1'},{a:'1'}]) //[{a:'1'}]


//普通数组去重
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);


//数据计算相关
//https://github.com/nefe/number-precision/blob/master/src/index.ts

//compose 组合函数 



// es6
 const compose = (f,g) => x > f(g(x));

// 网上看到的redux源码的一个compose函数:

function compose(...funcs){
  if(funcs.length === 0){
    return arg => arg;
  }
  if(funcs.length === 1){
    return funcs[0]
  }
  return funcss.reduce((a,b) => (...args) => a(b(...args)))
}
