
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

function Partition(animations, array, low, high){
    let i = low - 1;
    for (let index = low; index <= high - 1; index++) {
        const element = array[index];
        if (element < array[high]){
            i++;

            let temp = array[i];
            array[i] = array[index];
            array[index] = temp;
            animations.push([i, index]);
        }
    }

    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    animations.push([i + 1, high]);
    return i + 1;
}