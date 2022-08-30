import React from "react";

export default class TopButtons extends React.Component {
    render () {
        return (
            <div className="top-btn">
                <button onClick={() => 
                    this.props.onClick('')
                }>Generate New Array
                </button>
                <button onClick={() => 
                    this.props.onClick('call-sort')}>Sort!
                </button>
            </div>
        )
    }
}