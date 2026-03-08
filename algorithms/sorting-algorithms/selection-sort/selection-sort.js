var selectionSort = function (arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; ++i) {
        let min = i;
        for (let j = i + 1; j < n; ++j) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
         [arr[min],arr[i]] = [arr[i],arr[min]];
    }
    return arr;
}
//testing
console.log(selectionSort([50,40,30,20,10]));