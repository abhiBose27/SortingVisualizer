import { SWAP } from "../helper/constants";
import { swap } from "../helper/swap";

export function getSelectionSortAnimations(array){
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        let lowest = i;
        for (let j = i + 1; j < array.length; j++){
            
            if (array[j] < array[lowest]){
                lowest = j;
                // Boolean is to check if there is a swap or not
            }    
            animations.push([i, lowest, !SWAP]);
        }
        if (i !== lowest){
            swap(array, i, lowest);
            // Boolean is to check if there is a swap or not
            animations.push([i, lowest, SWAP]);  
        } 
    }
    return animations;
}