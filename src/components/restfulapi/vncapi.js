import baseApi from "../../assets/js/baseapi";

const vnc_mode = 3;
const repeaterId = Math.floor(Math.random()*9000)+1000;

let getVNCPropertysApi = function(selectedAgentId){
    return new Promise((resolve, reject) => {
        var getPatamsData={
            agentid: selectedAgentId,
            mode: vnc_mode,
            repeaterid: repeaterId
        };
        baseApi.apiPost("rmm/v1/kvm",getPatamsData).then((data) =>{
            resolve(data);
        }).catch((err) => {
            resolve(err.response);
        })
    })
},

export default getVNCPropertysApi;
