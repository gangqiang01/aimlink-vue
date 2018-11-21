import {apiGet, apiPost} from "../../assets/js/baseapi";


let loginApi = function(username, password){
    return new Promise((resolve, reject) => {
        let data = {}
        data.username = username
        data.password = password
        data._now = Date.parse(new Date());
        data.redirectUri = '172.21.73.144:8081';
        apiPost('/rmm/v1/sso/login', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    loginApi,
    loginoutApi
}