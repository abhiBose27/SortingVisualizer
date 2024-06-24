import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";

/*
Heapsort is a comparison-based sorting algorithm that uses a binary heap data structure. 
Like mergesort, heapsort has a running time of O(n\log n),O(nlogn), and like insertion sort, 
heapsort sorts in-place, so no extra space is needed during the sort. 
*/

export const getHeapSortAnimations = (list) => {
    const animations = []
    heapsort(animations, list)
    return animations
}

const heapsort = (animations, list) => {
    const N = list.length
    for (let i = Math.floor(N / 2); i > -1; i--) 
        heapify(animations, list, N, i)

    for (let i = N - 1; i > 0; i--) {
        swap(list, 0, i)
        animations.push([0, i, SWAP])
        heapify(animations, list, i, 0)
    }
}

const heapify = (animations, list, N, i) => {
    let largest = i
    let left    = 2 * i + 1
    let right   = 2 * i + 2

    if (left < N && list[largest] < list[left]) {
        animations.push([largest, left, COMPARE])
        largest = left
    }
    if (right < N && list[largest] < list[right]) {
        animations.push([largest, right, COMPARE])
        largest = right
    }

    if (largest !== i) {
        swap(list, largest, i)
        animations.push([largest, i, SWAP])
        heapify(animations, list, N, largest)
    }
}