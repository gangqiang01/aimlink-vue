
import {apiGet, apiPost, apiPut, repoApiGet, repoApiPost} from "../../assets/js/baseapi";


let getSensorStatusApi = function(did, sensorId, agentId, plugin){
    return new Promise((resolve, reject) => {
        let GetSensorsData= {
            agentId: agentId,
            plugin: plugin,
            sensorId: sensorId,
            _: Date.parse(new Date()),
        };
        
        let myurl = "rmm/v1/devicectrl/"+did+"/data";
        apiGet(myurl, GetSensorsData).then((obj) => {
            resolve(data);
        }).catch((error) => {
            resolve(err.response);
        })
    })
}

let setSensorStatusApi = function(setSensorId, setsensorval, selectedAgentId, plugin){
    return new Promise((resolve, reject) => {
        let setsensordata = {
            agentId: selectedAgentId,
            plugin: plugin,
            sensorIds: [
                {
                    n: setSensorId, 
                    sv: setsensorval
                }
            ],
        };
        apiPost("rmm/v1/devicectrl/data",setsensordata).then((data) => {
            resolve(data);
        }).catch((error) => {
            resolve(err.response);
        })
    })
}

let getRepoAppsApi = function(repoUrl, appInfoUrl){
    return new Promise((resolve, reject) => {

        let AppInfoUrl = getRepoAppUrl;
        let repourl = getRepoToken;
        let formData = {username:"jinxin",passwd:"jinxin"};
        let info_data;
        repoApiPost(repourl, formData).then((token_data) =>{
            let token = token_data.token;
            repoApiGet(AppInfoUrl, info_data, token).then((data) => {
                resolve(data);
            }).catch((error) => {
                resolve(err.response);
            })
        })
    })
}

let powerActionApi = function(action, selectedDeviceId){
    return new Promise((resolve, reject) => {

        let powdata = {
            action: action,
            did: selectedDeviceId
        };
        apiPut("rmm/v1/power/device", powdata).then((data) => {
            resolve(data);
        }).catch((error) => {
            resolve(err.response);
        })
    })
}

export {
    getSensorStatusApi,
    setSensorStatusApi,
    getRepoAppsApi,
    powerActionApi 
}