import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export const getBubbleSortAnimations = (list) => {
    const animations = []
    for (let i = 0; i < list.length; i++) {
        let swapped = false
        for (let j = 0; j < list.length - i - 1; j++) {
            animations.push([j, j + 1, COMPARE])
            if (list[j] <= list[j + 1])
                continue
            animations.push([j, j + 1, SWAP])
            swap(list, j, j + 1)
            swapped = true
        }
        if (!swapped) break
    }
    return animations
}