export function getMergeSortAnimations(array){
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    const auxArr = array.slice();
    mergeSortAlgo(array, 0, array.length - 1, auxArr, animations);
    return animations;
}

export function mergeSortAlgo(mainArr, start_idx, end_idx, auxArr, animations){
    if (start_idx === end_idx)
        return;
    const mid_idx = Math.floor((start_idx + end_idx) / 2);
    mergeSortAlgo(auxArr, start_idx, mid_idx, mainArr, animations);
    mergeSortAlgo(auxArr, mid_idx + 1, end_idx, mainArr, animations);
    doMerge(mainArr, start_idx, mid_idx, end_idx, auxArr, animations);
}

function doMerge(mainArr, start_idx, mid_idx, end_idx, auxArr, animations){
    let k = start_idx;
    let i = start_idx;
    let j = mid_idx + 1;

    while (i <= mid_idx && j <= end_idx) {
        animations.push([i, j, false]);
        //animations.push([i, j]);
        if (auxArr[i] <= auxArr[j]) {
            animations.push([k, auxArr[i], true]);
            mainArr[k++] = auxArr[i++];
        }
        else{
            animations.push([k, auxArr[j], true]);
            mainArr[k++] = auxArr[j++];
        }
    }

    while (i <= mid_idx) {
        animations.push([i, i, false]);
        //animations.push([i, i]);

        animations.push([k, auxArr[i], true]);
        mainArr[k++] = auxArr[i++];
    }

    while (j <= end_idx){
        animations.push([j, j, false]);
        //animations.push([j, j]);

        animations.push([k, auxArr[j], true]);
        mainArr[k++] = auxArr[j++];
    }
}