const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1){
        return array;
    }

    const n = array.length;
    for (let i = 0; i < n; i++) {
        var swapped = false;
        for (let j = 0; j < n - i - 1; j++){
            
            if (array[j] > array[j + 1]){
                animations.push([j, j + 1]);
                swap(array, j, j + 1);     
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return animations;
}