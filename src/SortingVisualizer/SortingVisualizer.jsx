import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithm/MergeSort";
import { getBubbleSortAnimations } from "../sortingAlgorithm/BubbleSort";
import { getSelectionSortAnimations } from "../sortingAlgorithm/SelectionSort";
import { getQuickSortAnimations } from "../sortingAlgorithm/QuickSort";
import { randomIntFromRange} from "./tools";
import './SortingVisualizer.css'

const RED = 'red';
const TURQUOISE = 'turquoise';
const ORANGE = '#ff6200';
const GREEN = '#6fff00';
const PINK = 'pink';

const DEFAULT_SIZE = 100;
const MIN_SIZE = 10;
const MAX_SIZE = 500;

const DEFAULT_SPEED = 10;
const MIN_SPEED = 1;
const MAX_SPEED = 500;

//const SLIDER_MAX_SPEED = 500;

const SORT_STATE_SPEED = 5;

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            len: DEFAULT_SIZE,
            speed: DEFAULT_SPEED,
            sortAlgo: '',
        };
        this.sorted = false;
        this.isRunning = false;
    }

    componentDidMount(){
        this.resetArray();
    }


    setLenofArray(value){
        this.setState({len: value});
        this.componentDidMount();
    }

    setSpeed(value){
        this.setState({speed: value});
    }


    resetArray() {
        this.sorted = false;
        const array = [];
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let index = 0; index < this.state.len; index++) 
            array.push(randomIntFromRange(5, 730));
        
        
        for (let arrayBar of arrayBars)
            arrayBar.style.backgroundColor = TURQUOISE;
        
        this.setState({array});
        this.setState({sortAlgo: ''});
    }


    callSort(){
        if (this.sorted){ 
            alert("Already Sorted. Generate New Array.");
            return;
        }
        switch (this.state.sortAlgo) {
            case 'merge-sort':
                this.MergeSort();
                break;
            case 'bubble-sort':
                this.BubbleSort();
                break;
            case 'selection-sort':
                this.SelectionSort();
                break;
            case 'quick-sort':
                this.QuickSort();
                break;
            default:
                alert("Select an Algorithm");
                break;
        }
    }

    changeState(){
        const buttons = document.getElementsByTagName('button');
        for (let btn of buttons) {
            btn.disabled = this.isRunning;
        }
        const inputs = document.getElementsByTagName('input');
        for (let input of inputs) {
            input.disabled = this.isRunning;
        }
    }

    async delay(ms = 1000){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async isSorted(arrayBars){
        for (let arrayBar of arrayBars) {
            arrayBar.style.backgroundColor = ORANGE;
            await this.delay(SORT_STATE_SPEED);
        }
        this.sorted = true;
    }

    async MergeSort() {
        this.isRunning = true;
        this.changeState();
        const SPEED = this.state.speed;
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange){
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const color = i % 3 === 0 ? RED : GREEN;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
                
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    barOneStyle.backgroundColor = PINK;
                }, i * SPEED);     
            }
        }
        await this.delay(animations.length * SPEED);
        await this.isSorted(arrayBars);
        this.isRunning = false;
        this.changeState();
    }


    async BubbleSort(){
        this.isRunning = true;
        this.changeState();
        const SPEED = this.state.speed;
        const animations = getBubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++){
            
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.backgroundColor = RED;
            barTwoStyle.backgroundColor = RED;

            await this.delay(SPEED);
            const barOne = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = barOne;
            barOneStyle.backgroundColor = GREEN;
            barTwoStyle.backgroundColor = GREEN;
            

           await this.delay(SPEED);
           arrayBars[barOneIdx].style.backgroundColor = PINK;
           arrayBars[barTwoIdx].style.backgroundColor = PINK;
           
        }
        await this.isSorted(arrayBars);
        this.isRunning = false;
        this.changeState();
    }
        

    async SelectionSort(){
        this.isRunning = true;
        this.changeState();
        const SPEED = this.state.speed;
        const animations = getSelectionSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            
            var [barOneIdx, barTwoIdx] = animations[i].comparison;
            if (barOneIdx !== -1 && barTwoIdx !== -1){
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = RED;
                barTwoStyle.backgroundColor = RED;
    
                await this.delay(SPEED);

                barOneStyle.backgroundColor = TURQUOISE;
                barTwoStyle.backgroundColor = TURQUOISE;
                await this.delay(SPEED);
            }
            [barOneIdx, barTwoIdx] = animations[i].swap;
            if (barOneIdx !== -1 && barTwoIdx !== -1){
                

                const barOne = arrayBars[barOneIdx].style.height;
                arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
                arrayBars[barTwoIdx].style.height = barOne;
                arrayBars[barOneIdx].style.backgroundColor = GREEN;
                arrayBars[barTwoIdx].style.backgroundColor = GREEN;
                await this.delay(SPEED);

                arrayBars[barOneIdx].style.backgroundColor = PINK;
                
            }
        }
        await this.isSorted(arrayBars);
        this.isRunning = false;
        this.changeState();
    }


    
    async QuickSort(){
        this.isRunning = true;
        this.changeState();
        const SPEED = this.state.speed;
        
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName("array-bar");
    
        for (let i = 0; i < animations.length; i++) {
          const [barOneIdx, barTwoIdx, isPivot] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;

          if (isPivot){
            barOneStyle.backgroundColor = GREEN;
            barTwoStyle.backgroundColor = GREEN;
            await this.delay(SPEED);
          }
          else{
            barOneStyle.backgroundColor = RED;
            barTwoStyle.backgroundColor = RED;
  
            await this.delay(SPEED);
  
            const barOne = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = barOne;
  
  
            barOneStyle.backgroundColor = PINK;
            barTwoStyle.backgroundColor = PINK;
          }

        }
        await this.isSorted(arrayBars);
        this.isRunning = false;
        this.changeState();
    }


    renderInput(){
        return (
            <div className="range-input">
                    <span id="size" className="label">Size
                        <input type="range" defaultValue={DEFAULT_SIZE} 
                        min={MIN_SIZE} 
                        max={MAX_SIZE}
                        onChange = {(e) => this.setLenofArray(e.target.value)}
                        style = {{marginLeft: '10px',}}    
                        ></input>
                    </span>
                    <span id="speed" className="label">Speed
                        <input type="text" className="range-bar" defaultValue={DEFAULT_SPEED} 
                        min={MIN_SPEED} 
                        max={MAX_SPEED}
                        onChange = {(e) => this.setSpeed(e.target.value)}
                        style = {{marginLeft: '10px',}}       
                        ></input>
                    </span>
                </div>
        );
    }

    


    renderButtons(){
        return(
            <div className="algorithms">
                    <button onClick={() => 
                    this.resetArray()}>Generate New Array</button>
                    <button onClick={() => 
                    this.setState({sortAlgo: 'merge-sort'})}>Merge Sort</button>
                    <button onClick={() => 
                    this.setState({sortAlgo: 'bubble-sort'})}>Bubble Sort</button>
                    <button onClick={() => 
                    this.setState({sortAlgo: 'selection-sort'})}>Selection Sort</button>
                    <button onClick={() => 
                    this.setState({sortAlgo: 'quick-sort'})}>Quick Sort</button>
                    <button onClick={() => this.callSort()}>Sort!</button>
                    
            </div>
        );
    }

    renderContainer(){
        const {array} = this.state;
        let widthVal = 1000 / this.state.len;
        return (
            <div id="sorting" className="array-container">
            {array.map((value, idx) => (
                <div className="array-bar" key={idx} style = {{
                    backgroundColor: TURQUOISE,
                    height: `${value}px`,
                    width: `${widthVal}px`,
                }}>
                </div>
            ))}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderContainer()}
                
                {this.renderInput()}
                
                {this.renderButtons()}
            </div>
        );
    }
}