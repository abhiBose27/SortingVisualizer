import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export const getShellSortAnimations = (list) => {
    return shellSort(list)
}

const shellSort = (list) => {
    const animations = []
    const n = list.length
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let j = gap; j < n; j++) {
            for (let i = j - gap; i >= 0; i -= gap) {
                animations.push([i + gap, i, COMPARE])
                if (list[i] <= list[i + gap])
                    break
                swap(list, i + gap, i)
                animations.push([i + gap, i, SWAP])
            }
        }
    }
    return animations
}