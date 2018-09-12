const loginstatus = function(){
    if(Cookies.get("sessionId") != undefined){
        console.log(page);
        var url = "rmm/v1/accounts/login"
       
    }else{
        this.$router.replace('/')  
    }
}

const loginout = function(){
    Cookies.remove("sessionId");
    this.$router.replate('/');
}

export default {loginstatus,loginout};
