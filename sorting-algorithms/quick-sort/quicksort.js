function partition(arr,low = 0,high = arr.length - 1) {
    let pivot = arr[low];
    let i = low + 1;
    let j = high;

    while (i <= j) {
        while (arr[i] <= pivot) {
            ++i;
        }
        while (arr[j] > pivot) {
            --j;
        }
        if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        ++i;
        --j;
        }
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
}

function quickSort(arr,low = 0, high = arr.length - 1) {
    if (low < high) {
        let pi = partition(arr,low,high);
        quickSort(arr,low,pi - 1);
        quickSort(arr,pi + 1,high);
    }
}

//testing

let arr = [5,4,3,2,1];
quickSort(arr);
console.log(arr);