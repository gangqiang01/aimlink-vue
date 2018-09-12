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
                    this.handleError(response)
                    _g.closeGlobalLoading()

                })
            })
        },
        apiPost(url, data) {
            return new Promise((resolve, reject) => {
                axios.post(url, data).then((response) => {
                resolve(response.data)
                }, (response) => {
                    this.handleError(response)
                    _g.closeGlobalLoading()
                })
            })
        },
        apiPostfile(url, data, config) {
            return new Promise((resolve, reject) => {
                axios.post(url, data, config).then((response) => {
                resolve(response.data)
                }, (response) => {
                    this.handleError(response)
                    _g.closeGlobalLoading()
                })
            })
        },
        apiDelete(url, id) {
            return new Promise((resolve, reject) => {
                axios.delete(url + id).then((response) => {
                    resolve(response.data)
                }, (response) => {
                    this.handleError(response)
                    _g.closeGlobalLoading()
                })
            })
        },
        apiPut(url, id, obj) {
            return new Promise((resolve, reject) => {
                axios.put(url + id, obj).then((response) => {
                resolve(response.data)
                }, (response) => {
                    _g.closeGlobalLoading()
                    this.handleError(response)
                })
            })
        },
        handleError(res) {
            if (res.code) {
                switch (res.code) {
                    case 401:
                    swal("","Login expired","error").then(function(){
                        this.$router.replace({path:'/'});
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
