// 数组去重

  uniq(arr) {
    const tmp = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(tmp).map((item) => JSON.parse(item));
  }
