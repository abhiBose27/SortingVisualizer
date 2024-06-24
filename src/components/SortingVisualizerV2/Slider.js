import React from "react"
import { DEFAULT_SIZE, DEFAULT_SPEED, MAX_SIZE, MAX_SPEED, MIN_SIZE, MIN_SPEED } from "../helper/constants"


export const Slider = React.memo(({onChange, isDisableButtons}) => {

    return (
        <div className="range-input">
            <span id="size" className="label">Size
                <input 
                    type="range" 
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    defaultValue={DEFAULT_SIZE}
                    style={{marginLeft: "10px"}}
                    onChange={(e) => onChange(e.target.value, "size")}
                    disabled={isDisableButtons}  
                />
            </span>
            <span id="speed" className="label">
                Speed
                <input
                    className="range-bar"
                    type="text"
                    min={MIN_SPEED}
                    max={MAX_SPEED}
                    defaultValue={DEFAULT_SPEED}
                    style={{marginLeft: "10px"}}
                    onChange={(e) => onChange(e.target.value, "speed")}
                    disabled={isDisableButtons}
                />
            </span>
        </div>
    )
})