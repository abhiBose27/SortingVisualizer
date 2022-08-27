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
                animations.push({
                    comparison: [i, lowest],
                    swap: [-1, -1],
                });
            }
           
        }
        const temp = array[i];
        array[i] = array[lowest];
        array[lowest] = temp;
        animations.push({
            comparison: [-1, -1],
            swap: [i, lowest],
        });
        
    }
    return animations;
}