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
