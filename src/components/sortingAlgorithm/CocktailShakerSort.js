import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";

/* 
Cocktail Sort is a variation of Bubble sort. 
The Bubble sort algorithm always traverses elements from left and moves the largest element to its correct position 
in the first iteration and second-largest in the second iteration and so on. 
Cocktail Sort traverses through a given array in both directions alternatively. 
Cocktail sort does not go through the unnecessary iteration making it efficient for large arrays.
*/
export function getCocktailSortAnimations(array){
    let animations = [];
    cocktailSort(array, animations);
    return animations;
}

function cocktailSort(array, animations){
    let n = array.length;
    let swapped = true;
    let start_idx = 0
    let end_idx = n - 1;

    while (swapped) {
        swapped = false;

        for (let index = start_idx; index < end_idx; index++) {
            if (array[index] > array[index + 1]){
                swap(array, index, index + 1);
                // If a swap, push it in with SWAP
                animations.push([index, index + 1, SWAP]);
                swapped = true;
            }
            else{
                // If not, push it in with !SWAP
                animations.push([index, index + 1, !SWAP]);
            }
        }
        if (!swapped) break;

        swapped = false;
        end_idx--;

        for (let index = end_idx - 1; index > start_idx - 1; index--){
            if (array[index] > array[index + 1]){
                swap(array, index, index + 1)
                // Same logic as before
                animations.push([index, index + 1, SWAP]);
                swapped = true;
            }
        }
        start_idx++;
    }
}