import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithm/MergeSort";
import { getBubbleSortAnimations } from "../sortingAlgorithm/BubbleSort";
import { getSelectionSortAnimations } from "../sortingAlgorithm/SelectionSort";
import { getQuickSortAnimations } from "../sortingAlgorithm/QuickSort";
import './SortingVisualizer.css'

import generateList from "../helper/generateList";
import { arrAreEqual} from "../sortingAlgorithm/test";
import Frame from "./Frame";
import Slider from "./Slider";
import Buttons from "./Buttons";

import { DEFAULT_SIZE, DEFAULT_SPEED, SPEED, SIZE, NORMAL, CURRENT, DONE, SWAP } from "../helper/constants";
import { getKeys } from "../helper/getKeys";
import delay from "../helper/delay";


export default class SortingVisualizer extends React.Component {

    state = {
        list: [],
        len: DEFAULT_SIZE,
        speed: DEFAULT_SPEED,
        algorithm: '',
        isRunning: false
    };

    componentDidMount(){
        this.generateList();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.isRunning !== prevState.isRunning){
            this.ChangeStateButtonsSliders(this.state.isRunning);
        }
        this.onClick();
        this.onChange();
        this.generateList();
    }
   
    generateList(value = 0) {
        if((this.state.list.length !== this.state.len && !this.state.isRunning) || value === 1) {
            let list = generateList(this.state.len);
            this.setState({ list: list });
        }
    }

    render(){
        return (
            <React.Fragment>
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

    onChange = (value, option) => {
        if (option === SIZE && !this.state.isRunning){
            this.setState({len: Number(value)});
        }
        else if (option === SPEED){
            this.setState({speed: Number(value)});
        }
    }

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
            case 'call-sort':
                this.start();
                break;
            case '':
                this.generateList(1)
                break;
            default:
                break;
        }
    }

    start = async() => {
        //console.log(this.state.algorithm);
        this.block(true);
        let animations = this.getAnimations(this.state.algorithm);
        await this.visualize(animations)
        await this.sorted();
        this.block(false);
    }

    getAnimations = (algorithm) => {
        let animations = [];
        let array = getKeys(this.state.list, this.state.len);
        switch (algorithm) {
            case 'merge-sort':
                animations = getMergeSortAnimations(array);
                break;
            case 'quick-sort':
                animations = getQuickSortAnimations(array);
                break;
            case 'bubble-sort':
                animations = getBubbleSortAnimations(array);
                break;
            case 'selection-sort':
                animations = getSelectionSortAnimations(array);
                break;
            default:
                alert("No Algorithm Selected");
                break;
        }
        return animations;
    }

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

    block = (bool) => {
        this.setState({isRunning: bool}); 
    }

    visualize = async(animations) => {
        if (animations.length === 0) return;
        if (animations[0].length === 4) {
            await this.visualizeRangeAnimations(animations);
        }
        else {
            await this.visualizeSwappingAnimations(animations);
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
            if(currentAnimations.length !== 3) {
                await this.visualizeMoves(animations);
                return;
            }
            else {
                let indices = [currentAnimations[0], currentAnimations[1]];
                await this.updateElementClass(indices, CURRENT);
                if (currentAnimations[2] === SWAP)
                    await this.updateList(indices);
                await this.updateElementClass(indices, NORMAL);
                animations.shift();
            }
        }
    }

    updateList = async(indices) => {
        let array = [...this.state.list];
        let temp = array[indices[0]].key;
        array[indices[0]].key = array[indices[1]].key;
        array[indices[1]].key = temp;
        await this.updateListStateChange(array);
    }

    updateElementVal = async(indices) => {
        let array = [...this.state.list];
        array[indices[0]].key = indices[1];
        await this.updateListStateChange(array);
    }

    updateElementClass = async(indices, classType) => {
        let array = [...this.state.list];
        for (let i = 0; i < indices.length; i++){
            array[indices[i]].classType = classType;
        }
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