import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export const getSelectionSortAnimations = (list) => {

    const animations = []
    for (let i = 0; i < list.length; i++) {
        let lowest = i
        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < list[lowest])
                lowest = j
            animations.push([i, j, COMPARE])
        }
        if (i !== lowest) {
            swap(list, i, lowest)
            animations.push([i, lowest, SWAP])
        }
    }
    return animations
}