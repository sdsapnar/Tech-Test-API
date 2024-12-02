exports.isAllParametersPresent = (array) => {
    const jsonData = array[0];
    array.splice(0, 1);
    const nonData = [];
    array.forEach((e) => {
        if (jsonData[e] === undefined || jsonData[e] === '') {
            nonData.push(e);
        }
    });
    return nonData;
};