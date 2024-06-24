import { MAX_VAL_SIZE, MIN_VAL_SIZE } from "./constants";

// Generate a list
export const generateList = (length) => {
    const list = []
    const min  = MIN_VAL_SIZE, max = MAX_VAL_SIZE
    for (let index = 0; index < length; index++) {
        const num = Math.floor(Math.random() * (max - min + 1) + min)
        list.push({key: num, classType: 0})
    }
    return list
}