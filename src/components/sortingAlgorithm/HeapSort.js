import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


/*
Heapsort is a comparison-based sorting algorithm that uses a binary heap data structure. 
Like mergesort, heapsort has a running time of O(n\log n),O(nlogn), and like insertion sort, 
heapsort sorts in-place, so no extra space is needed during the sort. 
*/
export function getHeapSortAnimations(array){
    let animations = [];
    let N = array.length - 1;

    // Build max heap
    buildMaxHeap(animations, array, N);

    for (let i = N; i >= 1; i--){
        swap(array, 0, i);
        // Push if there is a SWAP
        animations.push([0, i, SWAP]);
        heapify(animations, array, i - 1, 0);
    }
    return animations;
}

function buildMaxHeap(animations, array, N){
    for (let index = Math.floor(N / 2); index >= 0; index--) {
        heapify(animations, array, N, index);
    }
}

function heapify(animations, array, end_idx, current_idx){
    let childOneidx = current_idx * 2 + 1;

    while (childOneidx <= end_idx) {
        // No SWAP, so push with a !SWAP.
        animations.push([childOneidx, end_idx, !SWAP]);
        let childTwoIdx = current_idx * 2 + 2 <= end_idx ? current_idx * 2 + 2: -1;
        let indexToSwap;
        if (childTwoIdx !== -1 && array[childTwoIdx] > array[childOneidx]){
            indexToSwap = childTwoIdx;
        }
        else {
            indexToSwap = childOneidx;
        }

        if (array[indexToSwap] > array[current_idx]){
            // Same logic as before.
            animations.push([current_idx, indexToSwap, SWAP]);
            swap(array, current_idx, indexToSwap);
            current_idx = indexToSwap;
            childOneidx = current_idx * 2 + 1;
        }
        else return;
    }
}