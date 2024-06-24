import React from "react"

export const TopButtons = React.memo(({onClick, isDisableButtons}) => {
    return (
        <div className="top-btn">
            <button onClick={() => onClick("new array")} disabled={isDisableButtons}>New Array</button>
            <button onClick={() => onClick("reset")} disabled={isDisableButtons}>Reset</button>
            <button onClick={() => onClick("start")} disabled={isDisableButtons}>Sort</button>
        </div>
    )
})