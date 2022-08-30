import React from "react";

export default class Buttons extends React.Component{

    render () {
        return(
            <div className="algorithms">
                    <button onClick={() => 
                    this.props.onClick('merge-sort')}>Merge Sort</button>
                    <button onClick={() => 
                    this.props.onClick('bubble-sort')}>Bubble Sort</button>
                    <button onClick={() => 
                    this.props.onClick('selection-sort')}>Selection Sort</button>
                    <button onClick={() => 
                    this.props.onClick('quick-sort')}>Quick Sort</button>
                    <button onClick={() => 
                    this.props.onClick('cocktail-sort')}>Cocktail Sort</button>
                    <button onClick={() => 
                    this.props.onClick('heap-sort')}>Heap Sort</button>
                    <button onClick={() => 
                    this.props.onClick('radix-sort')}>Radix Sort</button>
                    <button onClick={() => 
                    this.props.onClick('shell-sort')}>Shell Sort</button>
                    
            </div>
        );
    }

}