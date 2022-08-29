import { getQuickSortAnimations } from "./QuickSort";
import { getMergeSortAnimations } from "./MergeSort";
import { getSelectionSortAnimations } from "./SelectionSort";
import { getBubbleSortAnimations } from "./BubbleSort";
import generateList from "../helper/generateList";
import { getKeys } from "../helper/getKeys";


export const arrAreEqual = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
}


function twoSetsOfarrays(){
    let size = 100;
    let array = getKeys(generateList(size), size);
    let copyArray = array.slice();

    return [array, copyArray];
}

export function test(){
    let [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getBubbleSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));

    console.log(arrAreEqual(array, copyArray));

    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getMergeSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));

    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getQuickSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));

    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getSelectionSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));
}