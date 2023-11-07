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
