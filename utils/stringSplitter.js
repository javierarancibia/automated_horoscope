const stringSplitter = (inputString, maxLength) => {
    const words = inputString.split(" ");
    const result = [];
    let currentLine = "";

    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine.length === 0 ? "" : " ") + word;
        } else {
        result.push(currentLine);
        currentLine = word;
        }
    }

    if (currentLine.length > 0) {
        result.push(currentLine);
    }

    return result;
}

module.exports = stringSplitter
