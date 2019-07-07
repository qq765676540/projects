function Tools() {}

Tools.prototype.deepClone = function(source) {
    const targetObj = source.constructor === Array ? [] : {};
    for (let keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = this.deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}

export default Tools;