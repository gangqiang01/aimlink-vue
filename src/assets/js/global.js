const commonFn = {
    unixToTime(unix){
        var d = new Date(parseInt(unix));
        var time = "";
        var Day = d.getUTCDate();if(Day<10) Day = "0"+Day;var Month = (d.getUTCMonth()+1);if(Month<10) Month = "0"+Month;
        var Hours = d.getHours();if(Hours<10) Hours = "0"+Hours;var Min = d.getUTCMinutes();if(Min<10) Min = "0"+Min;
        var Sec = d.getUTCSeconds();if(Sec<10) Sec = "0"+Sec;
        time = d.getUTCFullYear()+"/"+Month+"/"+Day+" "+Hours+":"+Min+":"+Sec;
        return time;
    },
    shallowRefresh(name){
        router.replace({path: '/refresh', query: {name: name}})
    },

    j2s(obj) {
        return JSON.stringify(obj)
    },
    closeGlobalLoading() {
        setTimeout(() => {
        store.dispatch('showLoading', false)
        }, 0)
    },
    openGlobalLoading() {
        setTimeout(() => {
        store.dispatch('showLoading', true)
        }, 0)
    },
    cloneJson(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    toastMsg(type, msg) {
        switch (type) {
        case 'normal':
            bus.$message(msg)
            break
        case 'success':
            bus.$message({
            message: msg,
            type: 'success'
            })
            break
        case 'warning':
            bus.$message({
            message: msg,
            type: 'warning'
            })
            break
        case 'error':
            bus.$message.error(msg)
            break
        }
    },
}

export default commonFn
