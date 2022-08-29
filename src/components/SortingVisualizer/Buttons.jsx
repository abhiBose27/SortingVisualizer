import React from "react";

export default class Buttons extends React.Component{

    render () {
        return(
            <div className="algorithms">
                    <button onClick={() => 
                    this.props.onClick('')}>Generate New Array</button>
                    <button onClick={() => 
                    this.props.onClick('merge-sort')}>Merge Sort</button>
                    <button onClick={() => 
                    this.props.onClick('bubble-sort')}>Bubble Sort</button>
                    <button onClick={() => 
                    this.props.onClick('selection-sort')}>Selection Sort</button>
                    <button onClick={() => 
                    this.props.onClick('quick-sort')}>Quick Sort</button>
                    <button onClick={() => 
                    this.props.onClick('call-sort')}>Sort!</button>
            </div>
        );
    }

}