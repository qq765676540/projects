define([], function () {
    let funs = {
        deepClone: (source) => {
            const targetObj = source.constructor === Array ? [] : {};
            for (let keys in source) {
                if (source.hasOwnProperty(keys)) {
                    if (source[keys] && typeof source[keys] === 'object') {
                        targetObj[keys] = source[keys].constructor === Array ? [] : {};
                        targetObj[keys] = funs['deepClone'](source[keys]);
                    } else {
                        targetObj[keys] = source[keys];
                    }
                }
            }
            return targetObj;
        }
    };

    return (name,param) => {
        return funs[name](param);
    };
});