function binarySearch(arr,target) {
    let n = arr.length;
    let start = 0;
    let end = n - 1;

    while (start < end) {
        let mid =((start + end) / 2) >> 0;
        if (target == arr[mid]) {
            return mid;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
} 

console.log(binarySearch([24,26,27,28,29,30],29));