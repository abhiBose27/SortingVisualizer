// A test file, for testing algorithm. This file is not called anywhere.
import { getQuickSortAnimations } from "./QuickSort";
import { getMergeSortAnimations } from "./MergeSort";
import { getSelectionSortAnimations } from "./SelectionSort";
import { getBubbleSortAnimations } from "./BubbleSort";
import generateList from "../helper/generateList";
import { getKeys } from "../helper/getKeys";
import { getHeapSortAnimations } from "./HeapSort";
import { getCocktailSortAnimations } from "./CocktailShakerSort";
import { getRadixSortAnimations } from "./RadixSort";
import { getShellSortAnimations } from "./ShellSort";

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


    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getHeapSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));


    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getCocktailSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));

    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    //array = [170, 45, 75, 90, 802, 24, 2, 66];
    getRadixSortAnimations(array);
    console.log(arrAreEqual(array, copyArray));

    [array, copyArray] = twoSetsOfarrays();
    copyArray.sort((a, b) => a - b);
    getShellSortAnimations(array);
    //assert(arrAreEqual(copyArray, array));
    console.log(arrAreEqual(array, copyArray));
}