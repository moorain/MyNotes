//取出[1,2,3,4,5,6,7,8]中和等于9的数

function findPairsWithSum(arr, targetSum) {
        const numMap = {};
        const result = [];

        for (let i = 0; i < arr.length; i++) {
          const currentNum = arr[i];
          const complement = targetSum - currentNum;

          if (numMap?.[complement]) {
            result.push([currentNum, complement]);
          }

          numMap[currentNum] = i;
        }

        return result;
      }
//取出[1,2,3,4,5,6,7,8,8,1,1,8]中和等于9的数，数字有重复
const func = (arr, num = 9) => {
        const numMap = {};
        const result = [];

        for (let i = 0; i < arr.length; i++) {
          const current = arr[i];
          const last = num - current;

          if (numMap[last]?.length) {
            result.push([current, numMap[last].shift()]);
          }

          numMap[current] = numMap[current] || [];
          numMap[current].push(current);
        }
        return result;
      };


// 3.并发任务控制
 function timeout(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    }

    class SuperTask {
      constructor() {
        this.tasks = [];
        this.runningTasks = 0;
        this.maxConcurrentTasks = 2;
      }

      _executeNextTask() {
        if (this.runningTasks < this.maxConcurrentTasks && this.tasks.length > 0) {
          const currentTask = this.tasks.shift();
          this.runningTasks++;
          currentTask();
        }
      }

      add(task) {
        return new Promise((resolve, reject) => {
          const taskWrapper = () => {
            task()
              .then((result) => resolve(result))
              .catch((error) => reject(error))
              .finally(() => {
                this.runningTasks--;
                this._executeNextTask();
              });
          };

          this.tasks.push(taskWrapper);
          this._executeNextTask();
        });
      }
    }

    const superTask = new SuperTask();

    function addTask(time, name) {
      superTask.add(() => timeout(time)).then(() => {
        console.log(`任务${name}完成！`)
      })
    }


    addTask(1000, 1)
    addTask(2000, 2)
    addTask(3000, 3)
    addTask(1000, 4)
    addTask(2000, 5)

    //1 -2 - 4 -3 -5
