export default function generateList(length){
    let list = [];
    let min = 5, max = 730;
    for (let counter = 0; counter < length; counter++) {
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        list.push({key: num, classType: 0});
    }
    return list
}