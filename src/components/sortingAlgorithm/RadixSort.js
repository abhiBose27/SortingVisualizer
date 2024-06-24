import { CHANGE_VALUE, READ } from "../helper/constants";

/*
Radix sort is the linear sorting algorithm that is used for integers. 
In Radix sort, there is digit by digit sorting is performed that is started from the least significant digit to the most significant digit.
*/

export const getRadixSortAnimations = (list) => {
    let max = Math.max(...list)
    let place = 1
    const animations = []
    while (Math.floor(max / place) > 0) {
        countingSort(animations, list, place)
        place *= 10;
    }
    return animations
}

const countingSort = (animations, list, place) => {
    const output = new Array(list.length)
    const count  = new Array(10).fill(0)

    for (let i = 0; i < list.length; i++) {
        const idx = Math.floor(list[i] / place) % 10
        animations.push([i, i, READ])
        count[idx]++
    }

    for (let i = 1; i < 10; i++)
        count[i] += count[i - 1]

    for (let i = list.length - 1; i >= 0; i--) {
        const idx = count[Math.floor(list[i] / place) % 10] - 1
        animations.push([idx, list[i], CHANGE_VALUE])
        output[idx] = list[i]
        count[Math.floor(list[i] / place) % 10]--
    }

    for (let i = 0; i < list.length; i++) 
        list[i] = output[i]
}