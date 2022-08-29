const delay = async(speed) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, speed);
    });
}

export default delay;