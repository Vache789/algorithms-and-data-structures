
function foo(arr){
    let tmp = 0;

    for(let i = 0; i < arr.length - 1; ++i){
        let flag = true;
        for(let j = 0; j < arr.length - i - 1; ++j){
            if(arr[j] > arr[j + 1]){
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                flag = false;
            }
            if(flag){
                return arr;
            }
        }
    }

    return arr;
}
