import { MAX_VAL_SIZE, MIN_VAL_SIZE } from "./constants";

// Generate a list
export default function generateList(length){
    let list = [];
    let min = MIN_VAL_SIZE, max = MAX_VAL_SIZE;
    for (let counter = 0; counter < length; counter++) {
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        list.push({key: num, classType: 0});
    }
    return list
}