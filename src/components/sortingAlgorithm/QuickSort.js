import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export const getQuickSortAnimations = (list) => {
    const animations = []
    quickSort(animations, list, 0, list.length - 1)
    return animations
}

const quickSort = (animations, list, start_idx, end_idx) => {
    if (start_idx >= end_idx) return
    let pivot_idx = partition(animations, list, start_idx, end_idx)
    quickSort(animations, list, start_idx, pivot_idx - 1)
    quickSort(animations, list, pivot_idx + 1, end_idx)
}

const partition = (animations, list, start_idx, end_idx) => {
    let pivot = list[end_idx]
    let i = start_idx

    for (let j = start_idx; j < end_idx; j++) {
        animations.push([i, j, COMPARE])
        if (list[j] <= pivot) {
            swap(list, i, j)
            animations.push([i, j, SWAP])
            i++
            continue
        }
    }

    swap(list, i, end_idx)
    animations.push([i, end_idx, SWAP])
    return i
}