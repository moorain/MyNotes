
let db: any = null;
const sheetName = 'modules';

export const initDatabase = (callback: any) => {
  const requestDB = window.indexedDB.open("MyTestDatabase");
  requestDB.onerror = function (event) {
    // 错误处理
    console.log(' 打开数据库报错');
    callback();
  };

  requestDB.onsuccess = function (event: any) {
    // 成功处理
    db = event.target.result;
    callback();
    console.log('打开数据库成功');
  };

  // 数据库不存在或版本号不一致回调
  requestDB.onupgradeneeded = function (event: any) {
    db = event.target.result;
    console.log('______________________', 'onupgradeneeded')
    var objectStore = null;
    if (!db.objectStoreNames.contains(sheetName)) {
      objectStore = db.createObjectStore(sheetName, { keyPath: 'id', autoIncrement: true });
      // 设置指定索引，并确保唯一性
      objectStore.createIndex('url', 'url', { unique: true });
    }
  }

}

export function add({
  url, blob
}: any) {
  const requestDB = db
    .transaction([sheetName], 'readwrite')
    .objectStore(sheetName)
    .add({ id: url, url, blob });
  requestDB.onsuccess = function () {
    console.log('数据写入成功');
  };
  requestDB.onerror = function () {
    console.log('数据写入失败');
  }
}

export function read(url: string) {
  return new Promise((resolve, reject) => {
    if (db) {
      const transaction = db.transaction([sheetName]);
      const objectStore = transaction.objectStore(sheetName);
      const request = objectStore.get(url);
      request.onerror = function () {
        console.log('事务失败');
      };
      request.onsuccess = function (event: any) {
        if (request.result) {
          resolve(request.result)
          console.log(request.result, 'request.result')
        } else {
          reject();
          console.log('未获得数据记录');
        }
      };
    } else {
      reject()
    }
  })
}
