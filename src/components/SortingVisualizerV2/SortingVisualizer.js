import "../SortingVisualizer/SortingVisualizer.css"

import { useCallback, useEffect, useState } from "react"
import { CHANGE_VALUE, COMPARE, CURRENT, DEFAULT_SIZE, DEFAULT_SPEED, DONE, NORMAL, READ, SIZE, SPEED, SWAP, UPDATE, deepClone } from "../helper/constants"
import { generateList } from "../helper/generateList"
import { getKeys } from "../helper/getKeys"
import { TopButtons } from "./TopButtons"
import { Frame } from "./Frame"
import { Slider } from "./Slider"
import { Buttons } from "./Buttons"
import { get_animations } from "../helper/getAnimations"
import { delay } from "../helper/delay"
import { isSorted } from "../sortingAlgorithm/test"


export const SortingVisualizer = () => {
    const [visualizerState, setVisualizerState] = useState({
        speed: DEFAULT_SPEED, 
        algorithm: "",
        list: [],
        prevList: [],
        listSize: DEFAULT_SIZE, 
        isRunning: false,
        isDisableButtons: false
    })

    const startVisualization = async() => {
        const animations = get_animations(visualizerState.algorithm, visualizerState.list)
        await visualize(animations)
        await sorted()
    }

    const visualize = async(animations) => {
        while (animations.length > 0) {
            const currentAnimations = animations[0]
            const indices = currentAnimations[2] === CHANGE_VALUE ? 
                [currentAnimations[0]] : [currentAnimations[0], currentAnimations[1]]
            if (currentAnimations[2] === COMPARE) {
                await updateElementClass(indices, CURRENT)
                await updateElementClass(indices, NORMAL)
            }
            if (currentAnimations[2] === READ) {
                await updateElementClass(indices, CURRENT)
                await updateElementClass(indices, NORMAL)
            }
            if (currentAnimations[2] === SWAP) {
                await updateElementClass(indices, UPDATE)
                await updateList(indices)
                await updateElementClass(indices, NORMAL)
            }
            if (currentAnimations[2] === CHANGE_VALUE) {
                await updateElementClass(indices, UPDATE)
                await updateElementKey(currentAnimations[0], currentAnimations[1])
                await updateElementClass(indices, NORMAL)
            }
            animations.shift()
        }
    }

    const updateList = async(indicesToUpdate) => {
        const list = [...visualizerState.list]
        const temp = list[indicesToUpdate[0]].key
        list[indicesToUpdate[0]].key = list[indicesToUpdate[1]].key
        list[indicesToUpdate[1]].key = temp
        await updateListStateChange(list)
    }

    const updateElementKey = async(index, key) => {
        const list =  [...visualizerState.list]
        list[index].key = key
        await updateListStateChange(list)
    }

    const updateElementClass = async(indicesToUpdate, classType) => {
        const list =  [...visualizerState.list]
        for (let indices of indicesToUpdate) 
            list[indices].classType = classType
        await updateListStateChange(list)
    }

    const updateListStateChange = async(newList) => {
        setVisualizerState({...visualizerState, list: newList})
        await delay(visualizerState.speed)
    }

    const sorted = async() => {
        if (!isSorted(getKeys(visualizerState.list))) {
            alert("Error: List not sorted")
            return
        }
        const indices = []
        for (let i = 0; i < visualizerState.listSize; i++)
            indices.push(i)
        await updateElementClass(indices, DONE)
    }

    const onClick = useCallback(async(target) => {
        if (target === "new array") {
            setVisualizerState((prevState) => {
                const list = generateList(prevState.listSize)
                const prevList = deepClone(list)
                return {...prevState, list: list, prevList: prevList}
            })
        }
        else if (target === "reset") {
            setVisualizerState((prevState) => {
                return {...prevState, list: deepClone(prevState.prevList)}
            })
        }
        else if (target === "start") {
            setVisualizerState((prevState) => {
                return {...prevState, isRunning: true, isDisableButtons: true}
            })
        }
        else {
            setVisualizerState((prevState) => {
                return {...prevState, algorithm: target}
            })
        }
    }, [])

    const onChange = useCallback((value, option) => {
        if (option === SIZE) {
            setVisualizerState((prevState) => {
                return {...prevState, listSize: Number(value)}
            })
        }
        if (option === SPEED) {
            setVisualizerState((prevState) => {
                return {...prevState, speed: 100 / Number(value)}
            })
        }
    }, [])

    useEffect(() => {
        setVisualizerState((prevState) => {
            const list = generateList(visualizerState.listSize)
            const prevList = deepClone(list)
            return {...prevState, list: list, prevList: prevList}
        })
    }, [visualizerState.listSize])

    useEffect(() => {
        const start = async() => {
            if (visualizerState.isRunning) {
                await startVisualization()
                setVisualizerState({...visualizerState, isRunning: false, isDisableButtons: false})
            }
        }
        start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visualizerState.isRunning])

    return (
        <>
            <TopButtons onClick={onClick} isDisableButtons={visualizerState.isDisableButtons}/>
            <Frame widthVal={1500/visualizerState.listSize} list={visualizerState.list}/>
            <Slider onChange={onChange} isDisableButtons={visualizerState.isDisableButtons}/>
            <Buttons onClick={onClick} isDisableButtons={visualizerState.isDisableButtons}/>
        </>
    )
}