// Out list has elements of type {key: <>, classType: <>}
// This function is to extract the key and store them.
export const getKeys = (array, length) => {
    let list = [];
    for(let i = 0 ; i < length ; ++i) {
        list.push(Number(array[i].key));
    }
    return list;
};