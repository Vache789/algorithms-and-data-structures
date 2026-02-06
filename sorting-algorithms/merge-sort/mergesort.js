function mergeSort(arr,left,right) {
    if (left >= right) return;
    let mid = ((left + right) / 2) >> 0;
    mergeSort(arr,left,mid);
    mergeSort(arr,mid + 1,right)
    merge(arr,left,mid,right);
}

function merge(arr,left,mid,right) {
    let start1 = left; 
    let start2 = mid + 1;
    let end1 = mid;
    let end2 = right;
    let res = [];

    while (start1 <= end1 && start2 <= end2) {
        if (arr[start1] <= arr[start2]) {
            res.push(arr[start1]);
            ++start1;
        } else {
            res.push(arr[start2]);
            ++start2;
        }
    }

    while (start1 <= end1) {
        res.push(arr[start1]);
        ++start1;
    }

    while (start2 <= end2) {
        res.push(arr[start2]);
        ++start2;
    }

    for (let i = 0; i < res.length; ++i) {
        arr[left] = res[i];
        left++;
    }
}

//testing

let arr = [5,4,3,2,1];
mergeSort(arr,0,4);
console.log(arr);