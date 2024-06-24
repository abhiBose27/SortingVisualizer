import { CHANGE_VALUE, COMPARE } from "../helper/constants";


export const getMergeSortAnimations = (list) => {
    const animations = []
    divide(list, animations, 0, list.length - 1)
    return animations
}

const divide = (list, animations, start_idx, end_idx) => {
    if (start_idx >= end_idx)
        return
    const mid_idx = Math.floor((start_idx + end_idx) / 2)
    divide(list, animations, start_idx, mid_idx)
    divide(list, animations, mid_idx + 1, end_idx)
    if (list[mid_idx] > list[mid_idx + 1])
        merge(list, animations, start_idx, mid_idx, end_idx)
}

const merge = (list, animations, start_idx, mid_idx, end_idx) => {
    const sortedList = []
    let i = start_idx, j = mid_idx + 1
    while (i <= mid_idx && j <= end_idx) {
        animations.push([i, j, COMPARE])
        if (list[i] <= list[j])
            sortedList.push(list[i++])
        else
            sortedList.push(list[j++])
    }
    while (i <= mid_idx)
        sortedList.push(list[i++])
    while (j <= end_idx)
        sortedList.push(list[j++])

    for (let idx = start_idx; idx <= end_idx; idx++){
        list[idx] = sortedList[idx - start_idx]
        animations.push([idx, list[idx], CHANGE_VALUE])
    }
}
