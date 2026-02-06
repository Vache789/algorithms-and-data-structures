function cumulativCountingSort(arr) {
    let n = arr.length;
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let range = (max - min) + 1;
    let count = new Array(range).fill(0);
    let res = new Array(count).fill(0);

    for (let i = 0; i < n; ++i) {
        count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; ++i) {
        count[i] += count[i - 1];
    }
    console.log(count);

    for (let i = n - 1; i >= 0; --i) {
        let value = arr[i];
        let index = value - min;
        let pos = count[index] - 1;
        res[pos] = arr[i];
        count[index]--;
    }
    return res;
}

//testing
console.log(cumulativCountingSort([563,560,561,563,560,570]));