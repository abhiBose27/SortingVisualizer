
export function getQuickSortAnimations(array){
    let animations = []
    QuickSort(animations, array, 0, array.length - 1);
    return animations;
}

function QuickSort(animations, array, low, high){
    if (low < high){
        let pi = Partition(animations, array, low, high);
        QuickSort(animations, array, low, pi - 1);
        QuickSort(animations, array, pi + 1, high);
    }
}

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function Partition(animations, array, low, high){
    let i = low - 1;
    animations.push([low, high, true]);
    for (let index = low; index <= high - 1; index++) {
        const element = array[index];
        if (element < array[high]){
            i++;
            swap(array, i, index)
            animations.push([index, i]);
        }
    }

    swap(array, i + 1, high);
    animations.push([i + 1, high, false]);
    return i + 1;
}