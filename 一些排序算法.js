
  const randomNumberArr = (arrLen = 100, maxValue = 1000) => {
    let arr = []
    for (let i = 0; i < arrLen; i++) {
      arr[i] = Math.floor((maxValue + 1) * Math.random())
    }
    return arr
  }

  let arr = randomNumberArr(10000, 1000)

  //1.冒泡排序--时间复杂度为 O(n^2)
  const bubleSort = arr => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] /*交换元素，ES6数组的解构赋值*/
        }
      }
    }
  }

  console.time('冒泡排序')
  bubleSort(arr)
  console.timeEnd('冒泡排序')


  //2.选择排序
  const sectionSort = arr => {
    for (let min = i = 0; i < arr.length /*i代表轮数*/; i++) {
      min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[min] > arr[j]) {
          min = j//找到当前轮最小值
        }
      }
      [arr[i], arr[min]] = [arr[min], arr[i]] //把每轮的第一个和当前轮的最小值交换位置
    }
  }
  console.time('选择排序')
  sectionSort(arr)
  console.timeEnd('选择排序')


  //3.快速排序（深度递归的函数可能会因为堆栈溢出而运行失败。。。）
  
  const erSort = arr => {
    if (arr.length <= 1) { return arr; }//如果输入数组长度小于等于1，直接返回数组。这也是递归算法的终结部分
    var base = Math.floor(arr.length / 2);//找到中间的基准元素位置
    var baseEle = arr.splice(base, 1)[0];//把基准元素从arr中摘除
    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < baseEle) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return erSort(left).concat([baseEle], erSort(right));

    //返回递归左右两个部分concat中间元素，这就是结果
  }
  console.time('快速排序')
  erSort(arr)
  console.timeEnd('快速排序')


  //4.插入排序
  const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] < arr[j]) {
          arr.splice(j, 0, arr[i])
          arr.splice(i + 1, 1)
          break
        }
      }
    }
  }
  console.time('插入排序')
  insertionSort(arr)
  console.timeEnd('插入排序')
