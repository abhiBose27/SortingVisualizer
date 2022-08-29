import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";

export function getQuickSortAnimations(array){
    let animations = []
    QuickSort(animations, array, 0, array.length - 1);
    return animations;
}

function QuickSort(animations, array, low, high){
    if (low >= high)
        return;
    let pi = Partition(animations, array, low, high);
    QuickSort(animations, array, low, pi);
    QuickSort(animations, array, pi + 1, high);
}


function Partition(animations, array, low, high){
    let pivot = array[low];
    let i = low - 1;
    let j = high + 1;

    while (true){
        i++;
        while (array[i] < pivot) {
            animations.push([i, low, !SWAP]);
            i++;
        }

        j--;
        while (array[j] > pivot){
            animations.push([j, low, !SWAP]);
            j--;
        }
        if (i >= j)
            return j;
        swap(array, i, j);
        animations.push([i, j, SWAP]);
    }
}