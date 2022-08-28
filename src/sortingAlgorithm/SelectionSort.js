const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

export function getSelectionSortAnimations(array){
    const animations = [];
    if (array.length <= 1){
        return array;
    }

    for (let i = 0; i < array.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < array.length; j++){
            if (array[j] < array[lowest]){
                lowest = j;
                // Boolean is to check if there is a swap or not
                animations.push([i, lowest, false]);
            }
           
        }
        swap(array, i, lowest);
        // Boolean is to check if there is a swap or not
        animations.push([i, lowest, true]);
        
    }
    return animations;
}