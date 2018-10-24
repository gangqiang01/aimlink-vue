const commonFn = {
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
}

export default commonFn
