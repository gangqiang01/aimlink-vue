import http from "./http";

const loginstatus = function(){
    var url = "rmm/v1/accounts/login"
    return http.methods.apiGet(url).then(
        (res) => {
            console.log(res);
            if(res.data.result){
                return true;
            }else{
                return false;
            }
        }
    )
}
export default {loginstatus};
