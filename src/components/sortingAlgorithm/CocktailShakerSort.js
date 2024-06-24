import { COMPARE, SWAP } from "../helper/constants";
import { swap } from "../helper/swap";

/* 
Cocktail Sort is a variation of Bubble sort. 
The Bubble sort algorithm always traverses elements from left and moves the largest element to its correct position 
in the first iteration and second-largest in the second iteration and so on. 
Cocktail Sort traverses through a given array in both directions alternatively. 
Cocktail sort does not go through the unnecessary iteration making it efficient for large arrays.
*/

export const getCocktailSortAnimations = (list) => {
    return cocktailSort(list)
}

const cocktailSort = (list) => {
    const animations = []
    let swappped     = true
    let start_idx    = 0
    let end_idx      = list.length - 1

    while (swappped) {
        swappped = false
        for (let i = start_idx; i < end_idx; i++) {
            animations.push([i, i + 1, COMPARE])
            if (list[i] <= list[i + 1])
                continue
            swap(list, i, i + 1)
            animations.push([i, i + 1, SWAP])
            swappped = true
        }
        if (!swappped) break
        swappped = false
        end_idx--

        for (let i = end_idx - 1; i >= start_idx; i--) {
            animations.push([i, i + 1, COMPARE])
            if (list[i] <= list[i + 1])
                continue
            swap(list, i, i + 1)
            animations.push([i, i + 1, SWAP])
            swappped = true
        }
        start_idx++
    }
    return animations
}