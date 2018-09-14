// 数组去重
  uniq(arr) {
    const tmp = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(tmp).map((item) => JSON.parse(item));
  }

//数据计算相关
//https://github.com/nefe/number-precision/blob/master/src/index.ts

