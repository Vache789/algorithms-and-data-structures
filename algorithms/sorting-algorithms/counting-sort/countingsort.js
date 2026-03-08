function countingSort(arr) {
    let n = arr.length;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = (max - min) + 1;
    let count = new Array(range).fill(0);
    let res = [];

    for (let i = 0; i < n; ++i) {
        count[arr[i] - min]++;
    }
    for (let i = 0; i < count.length; ++i) {
        while (count[i] > 0) {
            res.push(i + min);
            count[i]--;
        }
    }
    return res;
}

//testing
console.log(countingSort([560,562,561,562,570]));