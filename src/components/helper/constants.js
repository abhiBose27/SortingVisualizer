// Constants that help to know when to Overwrite a an element and
// to swap
export const SWAP = 1
export const CHANGE_VALUE = 2
export const COMPARE = 3
export const READ = 4

// Default configuration of list size
export const DEFAULT_SIZE = 50
export const MIN_SIZE = 10
export const MAX_SIZE = 200

// Default configuration of Speed Size
export const DEFAULT_SPEED = 10
export const MIN_SPEED = 0.1
export const MAX_SPEED = 50

// Key words used in event listeners
export const SPEED = "speed"
export const SIZE = "size"

// ClassType of an element
export const CURRENT = 1
export const NORMAL = 0
export const UPDATE = 2
export const DONE = 3

// Min value of an element and max value
export const MAX_VAL_SIZE = 5
export const MIN_VAL_SIZE = 500

export const deepClone = (list) => {
    return list.map((e) => {return {...e}})
}
