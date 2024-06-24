export const swap = (list, index1, index2) => {
    const cache  = list[index1]
    list[index1] = list[index2]
    list[index2] = cache
}