export function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*export function arrAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (let index = 0; index < arr1.length; index++) {
        if (arr1[index] !== arr2[index])
            return false;
    }
    return true;
}*/