import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";


export function getShellSortAnimations(array){
    let n = array.length;
    let animations = []
    shellSort(animations, array, n);
    return animations;
}

function shellSort(animations, array, n){
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)){
        for (let j = gap; j < n; j++){
            for (let i = j - gap; i >= 0; i -= gap){
                if (array[i + gap] > array[i]){
                    animations.push([i + gap, i, !SWAP]);
                    break;
                }
                else {
                    animations.push([i + gap, i, SWAP]);
                    swap(array, i + gap, i);
                }
            }

        }
    }
}