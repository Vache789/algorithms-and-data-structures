function bubbleSort(arr) {
let n = arr.length;

    for (let i = 0; i < n - 1; ++i) {
        let flag = false;
        for (let j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j],arr[j + 1]] = [arr[j + 1],arr[j]];
                flag == true;
            }
        }
        if (flag = false) {
            return arr;
        }
    }
    return arr;
}

//testing
console.log(bubbleSort([5,4,3,2,1]));