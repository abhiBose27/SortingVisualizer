import { CHANGE_VALUE } from "../helper/constants";

export function getMergeSortAnimations(array) {
    const animations = [];
    divide(array, animations, 0, array.length - 1);
    return animations;
}

function divide(array, animations, start_idx, end_idx) {
    if (start_idx < end_idx){
        const mid_idx = Math.floor((start_idx + end_idx) / 2);
        divide(array, animations, start_idx, mid_idx);
        divide(array, animations, mid_idx + 1, end_idx);
        if (array[mid_idx] > array[mid_idx + 1])
            merge(array, animations, start_idx, mid_idx, end_idx);
    }
}

function merge(array, animations, start_idx, mid_idx, end_idx){
    let sortedArray = [];
    let i = start_idx, j = mid_idx + 1;
    while (i <= mid_idx && j <= end_idx) {
        if (array[i] <= array[j]){
            sortedArray.push(array[i++]);
        }
        else {
            sortedArray.push(array[j++]);
        }
    }
    while (i <= mid_idx){
        sortedArray.push(array[i++]);
    }
    while (j <= end_idx){
        sortedArray.push(array[j++]);
    }

    let indices = [];
    for (let i = start_idx; i <= end_idx; i++) {
        indices.push(i);
    }
    for (let i = start_idx; i <= end_idx; i++){
        array[i] = sortedArray[i - start_idx];
        animations.push([i, array[i], CHANGE_VALUE, indices]);
    }
}

