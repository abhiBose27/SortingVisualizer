import React from "react"

export const Frame = React.memo(({widthVal, list}) => {
    
    const getClass = (classVal) => {
        if (classVal === 0) return "cell"
        if (classVal === 1) return "cell current"
        if (classVal === 2) return "cell update"
        return "cell done"
    }

    return (
        <div id="frame" className="array-container">
            {list.map((elm, idx) => (
                <div className={getClass(elm.classType)} 
                key={idx} 
                style={{
                    height: `${elm.key}px`,
                    width: `${widthVal}px`
                }} 
                defaultValue={elm.key}/>
            ))}
        </div>
    )
})