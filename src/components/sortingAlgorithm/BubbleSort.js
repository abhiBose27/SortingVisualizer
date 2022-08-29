import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export function getBubbleSortAnimations(array) {
    const animations = [];
    const n = array.length;
    for (let i = 0; i < n; i++) {
        var swapped = false;
        for (let j = 0; j < n - i - 1; j++){
            if (array[j] > array[j + 1]){
                animations.push([j, j + 1, SWAP]);
                swap(array, j, j + 1);     
                swapped = true;
            }
            else {
                animations.push([j, j + 1, !SWAP])
            }
        }
        if (!swapped) break;
    }
    return animations;
}