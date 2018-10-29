import baseApi from "../../assets/js/baseapi";

const deviceApi = {
    methods: {
        getDeviceApi(gid, deviceKeyword=""){
            return new Promise((resolve, reject) => {
                let groupid = gid;
                let devicegetdata = {};
                devicegetdata.pageSize = 10000;
                devicegetdata.no = 1;
                devicegetdata.orderType = "did"; 
                devicegetdata.like = deviceKeyword;
                devicegetdata._ = new Date().getTime();
                baseApi.apiGet("rmm/v1/devicegroups/"+groupid+"/devices", devicegetdata).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    resolve(err.response);
                })
            })
        },
        DeleteDeviceApi(multipleTable){
            return new Promise((resolve, reject) => {
                let dddata = {};
                dddata.devices = [];
                if (Object.prototype.toString.call(multipleTable) == "[object Object]"){
                    dddata.devices[0] = {"did": multipleTable.did, "groupIds":[]};
                }else if(Object.prototype.toString.call(multipleTable) === '[object Array]'){
                    multipleTable.forEach((value, i) => {
                        dddata.devices[i] = {"did": value.did, "groupIds":[]};   
                    })
                }
                baseApi.apiPut("rmm/v1/devices",  dddata).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    resolve(err.response);
                })
            })
        },

        getUnassignedDevicesApi(deviceKeyword=""){
            return new Promise((resolve, reject) => {
                let devgetdata = {};
                devgetdata.pageSize = 1000;
                devgetdata.no = 1;
                devgetdata.orderType = "did";
                devgetdata.like = deviceKeyword;
                devgetdata._ = new Date().getTime();
                _g.openGlobalLoading();
                baseApi.apiGet('rmm/v1/devices/unassigned', devgetdata).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    resolve(err.response);
                })
            })
            

        },

        addDeviceApi(multipleTable, gid){
            return new Promise((resolve, reject) => {
                let adddata = {};
                adddata.devices = [];
                let groupid = gid;
                
                multipleTable.forEach((val, i) => {
                    adddata.devices[i] = {};
                    adddata.devices[i].did = val.did;
                    adddata.devices[i].groupIds = [];
                    adddata.devices[i].groupIds[0] = groupid+"";
                    baseApi.apiPut("rmm/v1/devices", adddata).then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        resolve(err.response);
                    })
                })
            })
        },
    }
}
export default deviceApi;
