// Delay function called after every animation
export const delay = async(speed) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, speed)
    })
}