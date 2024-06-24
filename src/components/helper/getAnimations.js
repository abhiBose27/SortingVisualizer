import { getBubbleSortAnimations } from "../sortingAlgorithm/BubbleSort";
import { getCocktailSortAnimations } from "../sortingAlgorithm/CocktailShakerSort";
import { getHeapSortAnimations } from "../sortingAlgorithm/HeapSort";
import { getMergeSortAnimations } from "../sortingAlgorithm/MergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithm/QuickSort";
import { getRadixSortAnimations } from "../sortingAlgorithm/RadixSort";
import { getSelectionSortAnimations } from "../sortingAlgorithm/SelectionSort";
import { getShellSortAnimations } from "../sortingAlgorithm/ShellSort";
import { getKeys } from "./getKeys";


export const get_animations = (algorithm, list) => {
    const listKeys = getKeys(list)
    const algorithmToAnimatins = {
        "merge-sort": getMergeSortAnimations,
        "quick-sort": getQuickSortAnimations,
        "bubble-sort": getBubbleSortAnimations,
        "selection-sort": getSelectionSortAnimations,
        "cocktail-sort": getCocktailSortAnimations,
        "heap-sort": getHeapSortAnimations,
        "radix-sort": getRadixSortAnimations,
        "shell-sort": getShellSortAnimations
    }
    return algorithmToAnimatins[algorithm](listKeys)
}