const apiMethods = {
    methods: {
        apiGet(url, object) {
            if(object != undefined){
                var array = [],myurl;
                for(var key in object){
                    array.push(key+"="+object[key]);
                }
                var parameter = array.join("&")
                var geturl = url+ "?" + parameter;
            }else{
                var geturl = url;
            }
            var geturl = encodeURI(geturl);
            return new Promise((resolve, reject) => {
                axios.get(geturl).then((response) => {
                    resolve(response.data)
                    }, (response) => {
                    reject(response)
                    _g.closeGlobalLoading()

                })
            })
        },
        apiPost(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then((response) => {
            resolve(response.data)
            }).catch((response) => {
            console.log('f', response)
            resolve(response)
            bus.$message({
                message: '请求超时，请检查网络',
                type: 'warning'
            })
            })
        })
        },
        apiPostfile(url, data, config) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config).then((response) => {
            resolve(response.data)
            }).catch((response) => {
            console.log('f', response)
            resolve(response)
            bus.$message({
                message: '请求超时，请检查网络',
                type: 'warning'
            })
            })
        })
        },
        apiDelete(url, id) {
        return new Promise((resolve, reject) => {
            axios.delete(url + id).then((response) => {
            resolve(response.data)
            }, (response) => {
            reject(response)
            _g.closeGlobalLoading()
            bus.$message({
                message: '请求超时，请检查网络',
                type: 'warning'
            })
            })
        })
        },
        apiPut(url, id, obj) {
        return new Promise((resolve, reject) => {
            axios.put(url + id, obj).then((response) => {
            resolve(response.data)
            }, (response) => {
            _g.closeGlobalLoading()
            bus.$message({
                message: '请求超时，请检查网络',
                type: 'warning'
            })
            reject(response)
            })
        })
        },
        handelResponse(res, cb, errCb) {
        _g.closeGlobalLoading()
        if (res.code == 200) {
            cb(res.data)
        } else {
            if (typeof errCb == 'function') {
            errCb()
            }
            this.handleError(res)
        }
        },
        handleError(res) {
            if (res.code) {
                switch (res.code) {
                    case 401:
                    swal("","Login expired","error").then(function(){
                        window.location.href = "Login.html"
                    })
                    break
                case 403:
                    if(JSON.parse(err.responseText).Description != undefined){
                        swal("",JSON.parse(err.responseText).Description,"error")
                    }else if(JSON.parse(err.responseText).Field != undefined){
                        swal("",JSON.parse(err.responseText).Field,"error")
                    }else{
                        console.log(JSON.parse(err.responseText));
                    }
                    break
                case 400:
                    if(JSON.parse(err.responseText).Description != undefined){
                        swal("",JSON.parse(err.responseText).Description,"error");
                    }else if(JSON.parse(err.responseText).Field != undefined){
                        swal("",JSON.parse(err.responseText).Field,"error");
                    }else{
                        console.log(JSON.parse(err.responseText));
                    }
                
                default :
                    console.log(err)
                }
            } else {
                console.log('default error')
            }
        },
    }
}
export default apiMethods
