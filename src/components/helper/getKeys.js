// Out list has elements of type {key: <>, classType: <>}
// This function is to extract the key and store them.
export const getKeys = (list) => {
    return list.map((elm) => Number(elm.key))
}