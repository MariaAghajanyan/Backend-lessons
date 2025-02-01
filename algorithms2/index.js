// Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n; ++i) {  
        for (let j = 0; j < n - i - 1; ++j) {  
            if (arr[j] > arr[j + 1]) {
            
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

const array = [26, 11, 30, 21, 90];
console.log(bubbleSort(array)); 


// Insertion Sort
function insertionSort(arr){
    let n=arr.length;

    for(let i=1;i<n;++i){
        let current=arr[i]
        let j=i-1;

    while(j>=0&&arr[j]>current){
        arr[j+1]=arr[j]
        --j
       }
       arr[j+1]=current;
    }
    return arr;
    
}
const arr=[64, 34, 25, 12, 22, 11, 90]
console.log(insertionSort(arr))


//insertion sort-մասամբ դասաորված, փոքր զանգվածներ
// bubble sort - մեծ զանգվածներ
//
//





//selection sort
function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i; 

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(selectionSort(numbers)); 




//counting sort
function countingSort(arr) {
    if (arr.length === 0) return arr;

    let min = Math.min(...arr);
    let max = Math.max(...arr);
    let count = new Array(max - min + 1).fill(0);
    for (let num of arr) {
        count[num - min]++;
    }

    let sortedIndex = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[sortedIndex] = i + min;
            sortedIndex++;
            count[i]--;
        }
    }

    return arr;
}

const number = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort(number)); // [1, 2, 2, 3, 3, 4, 8]

