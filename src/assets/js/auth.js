import http from "./http"

const loginstatus = function(){
    var url = "rmm/v1/accounts/login"
    return http.methods.apiGet(url).then(
        function(data){
            console.log(data.result);
            if(data.result){
                
                return true;
            }else{
                return false;
            }
        }
    )
}



export default {loginstatus};
