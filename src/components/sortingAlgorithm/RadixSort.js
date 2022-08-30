import { CHANGE_VALUE, COMPARE } from "../helper/constants";

// The most fascinating sorting algorithm for me.
/*
Radix sort is the linear sorting algorithm that is used for integers. 
In Radix sort, there is digit by digit sorting is performed that is started from the least significant digit to the most significant digit.
 */
export function getRadixSortAnimations(array){
    let maxElt = Math.max(...array);
    let place = 1;
    let animations = [];
    while (Math.floor(maxElt / place) > 0) {
        countingSort(array, animations, place)
        place *= 10;
    }
    return animations
}

function countingSort(array, animations, place){
    let output = new Array(array.length);
    let count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++){
        let idx = Math.floor(array[i] / place) % 10;
        animations.push([i, i, COMPARE]);
        count[idx]++;
    }
    for (let i = 1; i < 10; i++){
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        let idx = count[Math.floor(array[i] / place) % 10] - 1;
        animations.push([idx, array[i], CHANGE_VALUE]);
        output[idx] = array[i];
        count[Math.floor(array[i] / place) % 10]--;
    }
    
    for (let i = 0; i < array.length; i++){
        array[i] = output[i];
    }
}