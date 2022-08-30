import { getBubbleSortAnimations } from "../sortingAlgorithm/BubbleSort";
import { getCocktailSortAnimations } from "../sortingAlgorithm/CocktailShakerSort";
import { getHeapSortAnimations } from "../sortingAlgorithm/HeapSort";
import { getMergeSortAnimations } from "../sortingAlgorithm/MergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithm/QuickSort";
import { getRadixSortAnimations } from "../sortingAlgorithm/RadixSort";
import { getSelectionSortAnimations } from "../sortingAlgorithm/SelectionSort";
import { getShellSortAnimations } from "../sortingAlgorithm/ShellSort";
import { getKeys } from "./getKeys";

export function get_animations(algorithm, list, size) {
    let animations = [];
    let array = getKeys(list, size);
        switch (algorithm) {
            case 'merge-sort':
                animations = getMergeSortAnimations(array);
                break;
            case 'quick-sort':
                animations = getQuickSortAnimations(array);
                break;
            case 'bubble-sort':
                animations = getBubbleSortAnimations(array);
                break;
            case 'selection-sort':
                animations = getSelectionSortAnimations(array);
                break;
            case 'cocktail-sort':
                animations = getCocktailSortAnimations(array);
                break;
            case 'heap-sort':
                animations = getHeapSortAnimations(array);
                break;
            case 'radix-sort':
                animations = getRadixSortAnimations(array);
                break;
            case 'shell-sort':
                animations = getShellSortAnimations(array);
                break;
            default:
                alert("No Algorithm Selected");
                break;
        }
        return animations;
}