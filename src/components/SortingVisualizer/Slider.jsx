import React from "react";
import { DEFAULT_SIZE, MIN_SIZE, MAX_SIZE, MIN_SPEED, MAX_SPEED, DEFAULT_SPEED} from "../helper/constants";

class Slider extends React.Component{
    render() {
        return (
            <div className="range-input">
                <span id="size" className="label">Size
                        <input type="range" defaultValue={DEFAULT_SIZE} 
                        min={MIN_SIZE} 
                        max={MAX_SIZE}
                        onChange = {(e) => this.props.onChange(e.target.value, "size")}
                        style = {{marginLeft: '10px',}}    
                        ></input>
                    </span>
                    <span id="speed" className="label">Speed
                        <input type="text" className="range-bar" defaultValue={DEFAULT_SPEED} 
                        min={MIN_SPEED} 
                        max={MAX_SPEED}
                        onChange = {(e) => this.props.onChange(e.target.value, "speed")}
                        style = {{marginLeft: '10px',}}       
                        ></input>
                    </span>
                   
            </div>
        );
    }
}
export default Slider;