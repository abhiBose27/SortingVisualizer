import React from "react";
import './SortingVisualizer.css'

import generateList from "../helper/generateList";
import { arrAreEqual} from "../sortingAlgorithm/test";
import Frame from "./Frame";
import Slider from "./Slider";
import Buttons from "./Buttons";

import { DEFAULT_SIZE, DEFAULT_SPEED, SPEED, SIZE, NORMAL, CURRENT, DONE, SWAP, CHANGE_VALUE } from "../helper/constants";
import delay from "../helper/delay";
import { get_animations } from "../helper/getAnimations";
import TopButtons from "./TopButtons";


export default class SortingVisualizer extends React.Component {

    state = {
        list: [],
        len: DEFAULT_SIZE,
        speed: DEFAULT_SPEED,
        algorithm: '',
        isRunning: false
    };

    // For initial Rendering
    componentDidMount(){
        this.generateList();
    }


    // Every time is setState is called. Our project is re-rendered
    componentDidUpdate(prevProps, prevState){
        if (this.state.isRunning !== prevState.isRunning){
            this.ChangeStateButtonsSliders(this.state.isRunning);
        }
        this.onClick();
        this.onChange();
        this.generateList();
    }
   
    // for generating a list of type elements {key: <Value>, ClassType <0>}
    generateList(value = 0) {
        if((this.state.list.length !== this.state.len && !this.state.isRunning) || value === 1) {
            let list = generateList(this.state.len);
            this.setState({ list: list });
        }
    }

    render(){
        return (
            <React.Fragment>
                <TopButtons 
                    onClick = {this.onClick}
                />
                 <Frame
                    list = {this.state.list}
                    widthVal = {1500/this.state.len}
                />
                <Slider
                    onChange = {this.onChange}
                />
                <Buttons 
                    onClick = {this.onClick}
                />
            </React.Fragment>
           
        );
    }

    // Event listener if there is a change in Size or speed.
    onChange = (value, option) => {
        if (option === SIZE && !this.state.isRunning){
            this.setState({len: Number(value)});
        }
        else if (option === SPEED){
            this.setState({speed: Number(value)});
        }
    }

    // Event listener for buttons
    onClick = (target) => {
        switch (target) {
            case 'merge-sort':
                this.setState({algorithm: target});
                break;
            case 'bubble-sort':
                this.setState({algorithm: target});
                break;
            case 'selection-sort':
                this.setState({algorithm: target});
                break;
            case 'quick-sort':
                this.setState({algorithm: target});
                break;
            case 'cocktail-sort':
                this.setState({algorithm: target});
                break;
            case 'heap-sort':
                this.setState({algorithm: target});
                break;
            case 'radix-sort':
                this.setState({algorithm: target});
                break;
            case 'shell-sort':
                this.setState({algorithm: target});
                break;
            case 'call-sort':
                this.start();
                break;
            /*case 'test':
                test();
                break;
            */
            case '':
                this.generateList(1)
                break;
            default:
                break;
        }
    }

    // To start the process of visualizations. Buttons and sliders are disabled to 
    // To prevent changing of values and algorithms in between the process
    start = async() => {
        let animations = this.getAnimations(this.state.algorithm);
        if (animations.length !== 0){
            this.block(true);
            await this.visualize(animations)
            await this.sorted();
            this.block(false);
        }  
    }

    // Get the animations from the algorithm chosen
    getAnimations = (algorithm) => {
        return get_animations(algorithm, this.state.list, this.state.len);
    }

    // To disable the slider and buttons when the process of sorting has started. 
    // And enable it after.
    ChangeStateButtonsSliders = (bool) => {
        const btns = document.getElementsByTagName('button');
        for (let btn of btns){
            btn.disabled = bool;
            btn.style.cursor = bool ? 'default': 'pointer';
        }
        const inputs = document.getElementsByTagName('input');
        for (let input of inputs){
            input.disabled = bool;
        } 
    }

    // Set the state of isRunning.
    block = (bool) => {
        this.setState({isRunning: bool}); 
    }

    // Main function that starts animations.
    visualize = async(animations) => {
        if (animations.length === 0) return;
        if (animations[0].length === 4) {
            await this.visualizeRangeAnimations(animations);
        }
        else if (animations[0].length === 3){
            let classType = animations[0][2];
            if (classType === SWAP || classType === !SWAP) 
                await this.visualizeSwappingAnimations(animations);
            else {
                //console.log("overwrite");
                await this.visualizeOverWriteAnimations(animations);
            }
        }
    }

    visualizeOverWriteAnimations = async(animations) => {
        while (animations.length > 0) {
            let currentAnimations = animations[0];
            await this.updateElementClass([currentAnimations[0]], CURRENT);
            if (currentAnimations[2] === CHANGE_VALUE)
                await this.updateElementVal([currentAnimations[0], currentAnimations[1]]);
            await this.updateElementClass([currentAnimations[0]], NORMAL);
            animations.shift();        
        }
    }

    visualizeRangeAnimations = async(animations) => {
        let prevRange = [];
        while (animations.length > 0 && animations[0].length === 4){
            if (!arrAreEqual(prevRange, animations[0][3])) {
                await this.updateElementClass(prevRange, NORMAL);
                prevRange = animations[0][3];
                await this.updateElementClass(animations[0][3], CURRENT);
            }
            await this.updateElementVal([animations[0][0], animations[0][1]]);
            animations.shift();
        }
    }

    visualizeSwappingAnimations = async(animations) => {
        while (animations.length > 0) {
            let currentAnimations = animations[0];
            let indices = [currentAnimations[0], currentAnimations[1]];
            await this.updateElementClass(indices, CURRENT);
            if (currentAnimations[2] === SWAP)
                await this.updateList(indices);
            await this.updateElementClass(indices, NORMAL);
            animations.shift();   
        }
    }

    updateList = async(listToUpdate) => {
        let array = [...this.state.list];
        let temp = array[listToUpdate[0]].key;
        array[listToUpdate[0]].key = array[listToUpdate[1]].key;
        array[listToUpdate[1]].key = temp;
        await this.updateListStateChange(array);
    }

    updateElementVal = async(indices) => {
        let array = [...this.state.list];
        array[indices[0]].key = indices[1];
        await this.updateListStateChange(array);
    }

    updateElementClass = async(listToUpdate, classType) => {
        let array = [...this.state.list];
        for (let i = 0; i < listToUpdate.length; i++)
            array[listToUpdate[i]].classType = classType;
        await this.updateListStateChange(array);
    }

    updateListStateChange = async(newList) => {
        this.setState({list: newList});
        await delay(this.state.speed);
    }

    sorted = async() => {
        let indices = [];
        for (let i = 0; i < this.state.len; i++){
            indices.push(i);
        }
        await this.updateElementClass(indices, DONE);
    }
}