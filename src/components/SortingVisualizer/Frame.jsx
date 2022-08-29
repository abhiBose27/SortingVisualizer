import React from "react";
import { DEFAULT_COLOR } from "../helper/constants";

export default class Frame extends React.Component {
    render () {
        return (
            <div id="sorting" className="array-container">
            {this.props.list.map((elm, idx) => (
                <div className={this.getClass(elm.classType)} 
                    key={idx} 
                    style = {{
                        height: `${elm.key}px`,
                        width: `${this.props.widthVal}px`
                    }}
                    value = {elm.key}
                    >
                </div>
            ))}
            </div>
        );
    }

    getClass = (classVal) => {
        if(classVal === 0) return 'cell';
        else if(classVal === 1) return 'cell current';
        return 'cell done';
    }
}