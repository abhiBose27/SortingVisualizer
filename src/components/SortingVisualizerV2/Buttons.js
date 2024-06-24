import React from "react"

export const Buttons = React.memo(({onClick, isDisableButtons}) => {
    return (
        <div className="algorithms">
            <button onClick={() => onClick("merge-sort")} disabled={isDisableButtons}>Merge Sort</button>
            <button onClick={() => onClick("bubble-sort")} disabled={isDisableButtons}>Bubble Sort</button>
            <button onClick={() => onClick("selection-sort")} disabled={isDisableButtons}>Selection Sort</button>
            <button onClick={() => onClick("quick-sort")} disabled={isDisableButtons}>Quick Sort</button>
            <button onClick={() => onClick("cocktail-sort")} disabled={isDisableButtons}>Cocktail Sort</button>
            <button onClick={() => onClick("heap-sort")} disabled={isDisableButtons}>Heap Sort</button>
            <button onClick={() => onClick("radix-sort")} disabled={isDisableButtons}>Radix Sort</button>
            <button onClick={() => onClick("shell-sort")} disabled={isDisableButtons}>Shell Sort</button>
        </div>
    )
})