//linear search
function linearSearcg(arr,target){
    for(let i=0;i<arr.length;++i){
        if(arr[i]===target){

        }
    }
    return -1
}


//jump search
function jumpSearch(arr, target) {
    let n = arr.length;
    let step = Math.floor(Math.sqrt(n)); 
    let prev = 0;


    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1; 
    }

    
    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) {
            return i; 
        }
    }
    return -1;
}

//binarysearch recursive
function binarySearchRecursive(arr, target, low, high) {
    if (low > high) return -1; 

    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
        return mid; 
    }

    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, high); 
    } else {
        return binarySearchRecursive(arr, target, low, mid - 1); 
    }
}


//Binary Search (Iterative)
function binarySearchIterative(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid; 
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1; 
        }
    }
    return -1;
}

