function createPropertyProxy(obj, propertyName, onChange) {
  // 检查属性是否存在
  if (!obj.hasOwnProperty(propertyName)) {
    return;
  }

  let isWatching = 1;
  const originalPropertyName = `__${propertyName}__`;

  // 定义一个函数用于停止监听
  function stopWatching() {
    isWatching = null;
  }

  // 首次监听
  if (isWatching && typeof onChange === "function") {
    onChange(obj[propertyName], { stopWatching });
  }

  // 保存原始属性值到 originalPropertyName 属性
  obj[originalPropertyName] = obj[propertyName];

  // 使用 Object.defineProperty 创建属性代理
  Object.defineProperty(obj, propertyName, {
    get: function () {
      return this[originalPropertyName];
    },
    set: function (value) {
      this[originalPropertyName] = value;
      if (isWatching && typeof onChange === "function") {
        onChange(value, { stopWatching });
      }
    },
  });
}

export { createPropertyProxy };
