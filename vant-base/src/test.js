let arr = ['EB','EC','EA','EE','ED'];
arr.sort((a,b) => {
    return a.substr(2,-1).charCodeAt() - b.substr(2,-1).charCodeAt();
});
console.log(arr);