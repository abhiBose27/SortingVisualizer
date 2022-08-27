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
                
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped)
            break;
    }
    return animations;
}