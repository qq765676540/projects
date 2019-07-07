$.extend({
    toLog: true,
    info(msg) {
        this.toLog && console.log(msg)
    },
    isToLog(flag) {
        this.toLog = flag;
    },
    getRandomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
});