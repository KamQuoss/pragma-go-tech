const getAdjustingFields = (position) => {
    let adjacent = [-1, -10, 1, 10];
    let adjustingFields = adjacent.map(value => position + value);

    return adjustingFields
}

const isAdjusting = (posA, posB) => {
    return getAdjustingFields(posA).includes(posB) || getAdjustingFields(posB).includes(posB)
}

const swap = (arr, index1, index2) => arr.map((val, idx) => {
    if (idx === index1) return arr[index2];
    if (idx === index2) return arr[index1];
    return val;
});


export { getAdjustingFields, isAdjusting, swap }