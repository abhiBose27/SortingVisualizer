// Delay function called after every animation
const delay = async(speed) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, speed);
    });
}

export default delay;